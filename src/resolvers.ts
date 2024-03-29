import { MongoDataSource } from "./data-sources/mongo";

interface IContextValue {
    dataSources: { mongoDataSource: MongoDataSource }
}

export const resolvers = {
    BookKind: {
        REGULAR: 'r',
        AUDIO: 'a',
        MIXED: 'r-a'
    },

    Query: {
        users: (_parent, _args, { dataSources }: IContextValue) => {
            return dataSources.mongoDataSource.getUsers();
        },

        user: (_parent, { id }, { dataSources }: IContextValue) => {
            return dataSources.mongoDataSource.getUser(id);
        },

        books: (_parent, { userId }, { dataSources }: IContextValue) => {
            return dataSources.mongoDataSource.getBooks(userId);
        },

        movies: (_parent, { userId }, { dataSources }: IContextValue) => {
            return dataSources.mongoDataSource.getMovies(userId);
        },
    },
};
