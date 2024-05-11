import { Mongoose, Model } from "mongoose"

import {
    Book,
    Movie,
    User,
    BookContent,
    MovieContent,
} from "../__generated__/resolvers-types";

export class MongoDataSource {
    private UserModel: Model<User>;
    private BookModel: Model<Book>;
    private MovieModel: Model<Movie>;

    constructor(dbConnection: Mongoose) {
        this.UserModel = dbConnection.model("User");
        this.BookModel = dbConnection.model("Book");
        this.MovieModel = dbConnection.model("Movie");
    }

    async getUsers() {
        return this.UserModel.find();
    }

    async getUser(id: string) {
        return this.UserModel.findById(id);
    }

    async findUserbyName(name: string) {
        return this.UserModel.findOne({ name });
    }

    async getBooks(userId: string, search: string) {
        const searchExpr = getSearchExpr(["author", "title"], search);
        return this.BookModel.find({ userId }).sort({ _id: -1 }).or(searchExpr);
    }

    async getBooksNextPage(userId: string, pageSize: number, cursor: string) {
        const condition = cursor ? { _id: { $lt: cursor } } : {};
        const query = this.BookModel.find({ userId, ...condition }).sort({ _id: -1 });
        return pageSize ? query.limit(pageSize) : query;
    }

    async getBooksPreviousPage(userId: string, pageSize: number, cursor: string) {
        const condition = cursor ? { _id: { $gt: cursor } } : {};
        const query = this.BookModel.find({ userId, ...condition }).sort({ _id: 1 });
        return pageSize ? query.limit(pageSize) : query;
    }

    async getBook(id: string) {
        return this.BookModel.findById(id);
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

    async getMovies(userId: string, search: string) {
        const searchExpr = getSearchExpr(["title", "year", "notes"], search);
        return this.MovieModel.find({ userId }).sort({ _id: -1 }).or(searchExpr);
    }

    async getMovie(id: string) {
        return this.MovieModel.findById(id);
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

const getSearchExpr = (fields: string[], search: string) =>
    fields.map((field) => ({ [field]: { $regex: new RegExp(search, 'i') }}));
