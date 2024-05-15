import { Mongoose, Model } from "mongoose"

import {
    Book,
    Movie,
    User,
    BookContent,
    MovieContent,
    RegisterData,
    SettingsData,
} from "../__generated__/resolvers-types";
import { hashPassword } from "../auth.js";

export class MongoDataSource {
    private UserModel: Model<User>;
    private BookModel: Model<Book>;
    private MovieModel: Model<Movie>;

    constructor(dbConnection: Mongoose) {
        this.UserModel = dbConnection.model("User");
        this.BookModel = dbConnection.model("Book");
        this.MovieModel = dbConnection.model("Movie");
    }

    async getPeople() {
        return this.UserModel.aggregate()
            .match({ $or: [{ shareBooks: true }, { shareMovies: true }] })
            .lookup({ from: "books", localField: "_id", foreignField: "userId", as: "books" })
            .lookup({ from: "movies", localField: "_id", foreignField: "userId", as: "movies" })
            .project({
                id: "$_id",
                name: 1,
                shareBooks: 1,
                shareMovies: 1,
                books: { $size: "$books" },
                movies: { $size: "$movies" },
                total: { $add: [{ $size: '$books' }, { $size: '$movies' }] }
              })
              .match({ total: { $gt: 0 } })
              .sort({ total: -1, name: 1 });
    }

    async findUserById(id: string) {
        return this.UserModel.findById(id);
    }

    async findUserbyName(name: string) {
        return this.UserModel.findOne({ name });
    }

    async findUserbyNameOrEmail(name: string, email: string) {
        return this.UserModel.findOne({ $or: [{ name }, { email }] });
    }

    async createUser(registerData: RegisterData) {
        const hashData = hashPassword(registerData.password);
        return await this.UserModel.create({
            name: registerData.name,
            email: registerData.email,
            ...hashData,
        });
    };

    async updateUser(id: string, { password, shareBooks, shareMovies }: SettingsData) {
        const hashData = password ? hashPassword(password) : {};
        let update = {
            shareBooks: !!shareBooks,
            shareMovies: !!shareMovies,
            ...hashData,
        };
        return this.UserModel.findByIdAndUpdate(id, update, { new: true });
    }

    async getBooks(userId: string) {
        return this.BookModel.find({ userId }).sort({ _id: -1 });
    }

    async createBook(userId: string, bookContent: BookContent) {
        return this.BookModel.create({ userId, ...bookContent });
    }

    async updateBook(id: string, bookContent: BookContent) {
        return this.BookModel.findByIdAndUpdate(id, bookContent, { returnDocument: "after" });
    }

    async deleteBook(id: string) {
        return this.BookModel.findByIdAndDelete(id);
    }

    async getMovies(userId: string) {
        return this.MovieModel.find({ userId }).sort({ _id: -1 });
    }

    async createMovie(userId: string, movieContent: MovieContent) {
        return this.MovieModel.create({ userId, ...movieContent });
    }

    async updateMovie(id: string, movieContent: MovieContent) {
        return this.MovieModel.findByIdAndUpdate(id, movieContent, { returnDocument: "after" });
    }

    async deleteMovie(id: string) {
        return this.MovieModel.findByIdAndDelete(id);
    }
}
