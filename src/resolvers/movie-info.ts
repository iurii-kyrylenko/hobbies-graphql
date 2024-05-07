import { IContextValue } from "..";
import { QueryResolvers } from "../__generated__/resolvers-types";

export const movieInfoResolver: QueryResolvers<IContextValue, {}> = {
    movieInfo: async (_root, { id }, { dataSources }) => {
        const result = await dataSources.moviesAPI.getMovieInfo(id);
        return { id, ...result };
    },
};
