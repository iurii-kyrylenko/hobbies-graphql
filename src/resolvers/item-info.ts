import { IContextValue } from "..";
import { QueryResolvers } from "../__generated__/resolvers-types";

export const itemInfoResolver: QueryResolvers<IContextValue, {}> = {
    bookInfo: async (_root, { author, title }, { dataSources }) => {
        return dataSources.booksAPI.getBookInfo(author, title);
    },

    movieInfo: async (_root, { id }, { dataSources }) => {
        const result = await dataSources.moviesAPI.getMovieInfo(id);
        return { id, ...result };
    },
};
