import { Mongoose, Model } from "mongoose"
import { IUser } from "../models/user";
import { IBook } from "../models/book";
import { IMovie } from "../models/movie";

export class MongoDataSource {
    private User: Model<IUser>;
    private Book: Model<IBook>;
    private Movie: Model<IMovie>;

    constructor(dbConnection: Mongoose) {
        this.User = dbConnection.model<IUser>("User");
        this.Book = dbConnection.model<IBook>("Book");
        this.Movie = dbConnection.model<IMovie>("Movie");
    }

    async getUsers() {
        return this.User.find();
    }

    async getUser(id: string) {
        return this.User.findById(id);
    }

    async getBooks(userId: string) {
        return this.Book.find({ userId });
    }

    async getMovies(userId: string) {
        return this.Movie.find({ userId });
    }
}
