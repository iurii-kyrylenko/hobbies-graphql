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

        book: (_parent, { id }, { dataSources }: IContextValue) => {
            return dataSources.mongoDataSource.getBook(id);
        },

        movies: (_parent, { userId }, { dataSources }: IContextValue) => {
            return dataSources.mongoDataSource.getMovies(userId);
        },
    },


    Mutation: {
        createBook: (_parent, { bookContent }, { dataSources }: IContextValue) => {
            return dataSources.mongoDataSource.createBook(bookContent);
        },

        updateBook: (_parent, { id, bookContent }, { dataSources }: IContextValue) => {
            return dataSources.mongoDataSource.updateBook(id, bookContent);
        },

        deleteBook: (_parent, { id }, { dataSources }: IContextValue) => {
            return dataSources.mongoDataSource.deleteBook(id);
        }
    }
};
