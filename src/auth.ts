import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql/error/GraphQLError";

export interface Auth {
    payload: string | jwt.JwtPayload;
    message: string;
}

export const jwtDecode = (token: string): Auth => {
    try {
        return {
            payload: token ? jwt.verify(token?.split(' ')?.[1], process.env.JWT_SECRET) : null,
            message: null,
        };
    } catch (error) {
        return {
            payload: null,
            message: error.message,
        };
    }
};

export const verifyAuth = (auth: Auth) => {
    if (!auth.payload) {
        throw new GraphQLError(`User is not authenticated: ${auth.message}`, {
            extensions: { code: "UNAUTHENTICATED", http: { status: 401 } },
        });
    }
};
