import { IContextValue } from "..";
import { QueryResolvers } from "../__generated__/resolvers-types";
import { checkPassword, jwtEncode, verifyAuth } from "../auth.js";
import { throwNotAuth, throwNotFound } from "../errors.js";

export const queriesResolver: QueryResolvers<IContextValue, {}> = {
    users: (_parent, _args, { auth, dataSources }) => {
        verifyAuth(auth);
        return dataSources.mongoDataSource.getUsers();
    },

    user: (_parent, { id }, { auth, dataSources }) => {
        verifyAuth(auth);
        return dataSources.mongoDataSource.getUser(id);
    },

    login: async (_parent, { name, password }, { dataSources }) => {
        const user = await dataSources.mongoDataSource.findUserbyName(name);
        if (!user) {
            throwNotFound(`User "${name}" not found`);
        }
        const { id, email, hash, salt } = user;
        if (checkPassword(password, hash, salt)) {
            return jwtEncode({ sub: id, email, name });
        } else {
            throwNotAuth("Invalid password");
        }
    },

    books: (_parent, { userId, search }, { dataSources }) => {
        return dataSources.mongoDataSource.getBooks(userId, search);
    },

    book: (_parent, { id }, { dataSources }) => {
        return dataSources.mongoDataSource.getBook(id);
    },

    booksNextPage: async (_parent, { userId, first, after }, { dataSources }) => {
        let books = await dataSources.mongoDataSource.getBooksNextPage(userId, first ? first + 1 : null, after);
        let cursor = null;

        if (first && books.length === first + 1) {
            books = books.slice(0, first);
            cursor = books[books.length - 1].id;
        }

        return { books, cursor };
    },

    booksPreviousPage: async (_parent, { userId, last, before }, { dataSources }) => {
        let books = await dataSources.mongoDataSource.getBooksPreviousPage(userId, last ? last + 1 : null, before);
        let cursor = null;

        if (last && books.length === last + 1) {
            books = books.slice(0, last);
            cursor = books[books.length - 1].id;
        }

        return { books: books.reverse(), cursor };
    },

    movies: (_parent, { userId, search }, { dataSources }) => {
        return dataSources.mongoDataSource.getMovies(userId, search);
    },

    movie: (_parent, { id }, { dataSources }) => {
        return dataSources.mongoDataSource.getMovie(id);
    },
};
