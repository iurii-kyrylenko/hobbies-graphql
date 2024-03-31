import { Mongoose, Model } from "mongoose"
import { IUser } from "../models/user";
import { IBook } from "../models/book";
import { IMovie } from "../models/movie";

import {
    Book,
    Movie,
    User,
    CreateBookContent,
    UpdateBookContent,
    CreateMovieContent,
    UpdateMovieContent,
} from "../__generated__/resolvers-types";

export class MongoDataSource {
    private UserModel: Model<IUser>;
    private BookModel: Model<IBook>;
    private MovieModel: Model<IMovie>;

    constructor(dbConnection: Mongoose) {
        this.UserModel = dbConnection.model("User");
        this.BookModel = dbConnection.model("Book");
        this.MovieModel = dbConnection.model("Movie");
    }

    async getUsers(): Promise<User[]> {
        return this.UserModel.find();
    }

    async getUser(id: string): Promise<User> {
        return this.UserModel.findById(id);
    }

    async getBooks(userId: string): Promise<Book[]> {
        return this.BookModel.find({ userId });
    }

    async getBook(id: string): Promise<Book> {
        return this.BookModel.findById(id);
    }

    async createBook(bookContent: CreateBookContent): Promise<Book> {
        const doc = await this.BookModel.create(bookContent);
        return this.getBook(doc.id);
    }

    async updateBook(id: string, bookContent: UpdateBookContent): Promise<Book> {
        return this.BookModel.findByIdAndUpdate(id, bookContent, { returnDocument: "after" });
    }

    async deleteBook(id: string): Promise<Book> {
        return this.BookModel.findByIdAndDelete(id);
    }

    async getMovies(userId: string): Promise<Movie[]> {
        return this.MovieModel.find({ userId });
    }

    async getMovie(id: string): Promise<Movie> {
        return this.MovieModel.findById(id);
    }

    async createMovie(movieContent: CreateMovieContent): Promise<Movie> {
        const doc = await this.MovieModel.create(movieContent);
        return this.getMovie(doc.id);
    }

    async updateMovie(id: string, movieContent: UpdateMovieContent): Promise<Movie> {
        return this.MovieModel.findByIdAndUpdate(id, movieContent, { returnDocument: "after" });
    }

    async deleteMovie(id: string): Promise<Movie> {
        return this.MovieModel.findByIdAndDelete(id);
    }
}
