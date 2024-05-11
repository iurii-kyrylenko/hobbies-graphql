import { GraphQLError } from "graphql/error/GraphQLError.js";

export const throwNotAuth = (message: string) => {
    throw new GraphQLError(`User is not authorized: ${message}`, {
        extensions: { code: "UNAUTHORIZED", http: { status: 401 } },
    });
};

export const throwForbidden = (message: string) => {
    throw new GraphQLError(`User is forbidden: ${message}`, {
        extensions: { code: "FORBIDDEN", http: { status: 403 } },
    });
};

export const throwNotFound = (message: string) => {
    throw new GraphQLError(message, {
        extensions: { code: "NOTFOUND", http: { status: 404 } },
    });
};
