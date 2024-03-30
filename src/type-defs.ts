export const typeDefs = `#graphql
    scalar Date

    enum BookKind {
        REGULAR
        AUDIO
        MIXED
    }

    type User {
        id: ID!
        email: String
        name: String!
        shareBooks: Boolean
        shareMovies: Boolean
    }

    type Book {
        id: ID!
        userId: ID!
        title: String!
        author: String!
        mode: BookKind!
        completed: Date!
    }

    input CreateBookContent {
        userId: ID!
        title: String!
        author: String!
        mode: BookKind!
        completed: Date!
    }

    input UpdateBookContent {
        userId: ID
        title: String
        author: String
        mode: BookKind
        completed: Date
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
        book(id: ID!): Book
        movies(userId: ID!): [Movie]
    }

    type Mutation {
        createBook(bookContent: CreateBookContent!): Book
        updateBook(id: ID!, bookContent: UpdateBookContent!): Book
        deleteBook(id: ID!): Book
    }
`;
