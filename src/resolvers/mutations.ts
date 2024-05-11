import { IContextValue } from "..";
import { MutationResolvers } from "../__generated__/resolvers-types";
import { verifyAuth } from "../auth.js";

export const mutationsResolver: MutationResolvers<IContextValue, {}> = {
    createBook: (_parent, { userId, bookContent }, { auth, dataSources }) => {
        verifyAuth(auth, userId);
        return dataSources.mongoDataSource.createBook(userId, bookContent);
    },

    updateBook: (_parent, { id, userId, bookContent }, { auth, dataSources }) => {
        verifyAuth(auth, userId);
        return dataSources.mongoDataSource.updateBook(id, bookContent);
    },

    deleteBook: (_parent, { id, userId }, { auth, dataSources }) => {
        verifyAuth(auth, userId);
        return dataSources.mongoDataSource.deleteBook(id);
    },

    createMovie: (_parent, { userId, movieContent }, { auth, dataSources }) => {
        verifyAuth(auth, userId);
        return dataSources.mongoDataSource.createMovie(userId, movieContent);
    },

    updateMovie: (_parent, { id, userId, movieContent }, { auth, dataSources }) => {
        verifyAuth(auth, userId);
        return dataSources.mongoDataSource.updateMovie(id, movieContent);
    },

    deleteMovie: (_parent, { id, userId }, { auth, dataSources }) => {
        verifyAuth(auth, userId);
        return dataSources.mongoDataSource.deleteMovie(id);
    }
};
