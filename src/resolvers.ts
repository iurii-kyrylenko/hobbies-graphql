import { Resolvers } from "./__generated__/resolvers-types";
import { verifyAuth } from "./auth";

export const resolvers: Resolvers = {
    BookKind: {
        REGULAR: 'r',
        AUDIO: 'a',
        MIXED: 'r-a'
    },

    Query: {
        users: (_parent, _args, { auth, dataSources }) => {
            verifyAuth(auth);
            return dataSources.mongoDataSource.getUsers();
        },

        user: (_parent, { id }, { auth, dataSources }) => {
            verifyAuth(auth);
            return dataSources.mongoDataSource.getUser(id);
        },

        books: (_parent, { userId }, { dataSources }) => {
            return dataSources.mongoDataSource.getBooks(userId);
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

        movies: (_parent, { userId }, { dataSources }) => {
            return dataSources.mongoDataSource.getMovies(userId);
        },

        movie: (_parent, { id }, { dataSources }) => {
            return dataSources.mongoDataSource.getMovie(id);
        },
    },

    Mutation: {
        createBook: (_parent, { bookContent }, { auth, dataSources }) => {
            verifyAuth(auth);
            return dataSources.mongoDataSource.createBook(bookContent);
        },

        updateBook: (_parent, { id, bookContent }, { auth, dataSources }) => {
            verifyAuth(auth);
            return dataSources.mongoDataSource.updateBook(id, bookContent);
        },

        deleteBook: (_parent, { id }, { auth, dataSources }) => {
            verifyAuth(auth);
            return dataSources.mongoDataSource.deleteBook(id);
        },

        createMovie: (_parent, { movieContent }, { auth, dataSources }) => {
            verifyAuth(auth);
            return dataSources.mongoDataSource.createMovie(movieContent);
        },

        updateMovie: (_parent, { id, movieContent }, { auth, dataSources }) => {
            verifyAuth(auth);
            return dataSources.mongoDataSource.updateMovie(id, movieContent);
        },

        deleteMovie: (_parent, { id }, { auth, dataSources }) => {
            verifyAuth(auth);
            return dataSources.mongoDataSource.deleteMovie(id);
        }
    }
};
