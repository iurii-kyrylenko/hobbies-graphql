import { IContextValue } from "..";
import { QueryResolvers } from "../__generated__/resolvers-types";
import { checkPassword, jwtEncode, verifyAuth } from "../auth.js";
import { throwNotAuth, throwNotFound } from "../errors.js";

export const queriesResolver: QueryResolvers<IContextValue, {}> = {
    people: (_parent, _args, { dataSources }) => {
        return dataSources.mongoDataSource.getPeople();
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

    books: (_parent, { userId }, { dataSources }) => {
        return dataSources.mongoDataSource.getBooks(userId);
    },

    movies: (_parent, { userId }, { dataSources }) => {
        return dataSources.mongoDataSource.getMovies(userId);
    },
};
