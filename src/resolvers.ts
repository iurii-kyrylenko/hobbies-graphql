export const resolvers = {
    BookKind: {
        REGULAR: 'r',
        AUDIO: 'a',
        MIXED: 'r-a'
    },

    Query: {
      users: (_parent, _args, { dataSources }) => {
        return dataSources.mongoDataSource.getUsers();
      },

      user: (_parent, { id }, { dataSources }) => {
        return dataSources.mongoDataSource.getUser(id);
      },

      books: (_parent, { userId }, { dataSources }) => {
        return dataSources.mongoDataSource.getBooks(userId);
      },

      movies: (_parent, { userId }, { dataSources }) => {
        return dataSources.mongoDataSource.getMovies(userId);
      },
    },
};
