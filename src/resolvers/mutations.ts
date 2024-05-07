import { IContextValue } from "..";
import { MutationResolvers } from "../__generated__/resolvers-types";
import { verifyAuth } from "../auth.js";

export const mutationsResolver: MutationResolvers<IContextValue, {}> = {
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
};
