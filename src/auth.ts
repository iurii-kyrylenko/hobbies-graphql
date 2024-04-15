import crypto from "crypto";
import jwt from "jsonwebtoken";
import { throwNotAuth } from "./errors.js";

interface Claims {
    sub: string;
    email: string;
    name: string;
}

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

export const jwtEncode = (claims: Claims) => {
    return jwt.sign(claims, process.env.JWT_SECRET, { expiresIn: "7 days" });
};

export const verifyAuth = (auth: Auth) => {
    if (!auth.payload) {
        throwNotAuth(auth.message)
    };
};

export const checkPassword = (password: string, hash: string, salt: string) =>
    crypto.pbkdf2Sync(password, salt, 1000, 64, "sha1").toString("hex") === hash;
