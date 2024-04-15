import { GraphQLError } from "graphql/error/GraphQLError.js";

export const throwNotAuth = (message: string) => {
    throw new GraphQLError(`User is not authenticated: ${message}`, {
        extensions: { code: "UNAUTHENTICATED", http: { status: 401 } },
    });
};

export const throwNotFound = (message: string) => {
    throw new GraphQLError(message, {
        extensions: { code: "NOTFOUND", http: { status: 404 } },
    });
};
