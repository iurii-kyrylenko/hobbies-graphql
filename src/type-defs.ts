export const typeDefs = `#graphql
    type User {
        id: ID!
        email: String
        name: String!
        shareBooks: Boolean
        shareMovies: Boolean
    }

    scalar Date

    enum BookKind {
      REGULAR
      AUDIO
      MIXED
    }

    type Book {
        id: ID!
        userId: ID!
        title: String!
        author: String!
        mode: BookKind!
        completed: Date!
      }
  
      type Movie {
        id: ID!
        userId: ID!
        title: String!
        year: String!
        notes: String
        completed: Date!
        imdbId: String
      }
  
        type Query {
        users: [User]!
        user(id: ID!): User
        books(userId: ID!): [Book]
        movies(userId: ID!): [Movie]
    }
`;
