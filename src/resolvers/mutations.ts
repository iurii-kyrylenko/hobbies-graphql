import { IContextValue } from "..";
import { MutationResolvers } from "../__generated__/resolvers-types";
import { jwtEncode, verifyAuth } from "../auth.js";
import { throwBadRequest, throwForbidden } from "../errors.js";

export const mutationsResolver: MutationResolvers<IContextValue, {}> = {
    register: async (_parent, { captchaToken, registerData }, { dataSources }) => {
        const { success, "error-codes": errors } =
            await dataSources.captchaApi.verifyCaptchaResponse(captchaToken);
        if (!success) {
            throwBadRequest(`Verify captcha error: ${errors[0]}`);
        }
        const user = await dataSources.mongoDataSource.findUserbyNameOrEmail(
            registerData.name, registerData.email
        );
        if (user) {
            throwForbidden(`User "${registerData.name}" already exists`);
        }
        const { id, email, name } = await dataSources.mongoDataSource.createUser(registerData);
        return jwtEncode({ sub: id, email, name });
    },

    updateUser: (_parent, { id, settings }, { auth, dataSources }) => {
        verifyAuth(auth, id);
        return dataSources.mongoDataSource.updateUser(id, settings);
    },

    createBook: (_parent, { userId, bookContent }, { auth, dataSources }) => {
        verifyAuth(auth, userId);
        return dataSources.mongoDataSource.createBook(userId, bookContent);
    },

    updateBook: (_parent, { id, userId, bookContent }, { auth, dataSources }) => {
        verifyAuth(auth, userId);
        return dataSources.mongoDataSource.updateBook(id, bookContent);
    },

    deleteBook: (_parent, { id, userId }, { auth, dataSources }) => {
        verifyAuth(auth, userId);
        return dataSources.mongoDataSource.deleteBook(id);
    },

    createMovie: (_parent, { userId, movieContent }, { auth, dataSources }) => {
        verifyAuth(auth, userId);
        return dataSources.mongoDataSource.createMovie(userId, movieContent);
    },

    updateMovie: (_parent, { id, userId, movieContent }, { auth, dataSources }) => {
        verifyAuth(auth, userId);
        return dataSources.mongoDataSource.updateMovie(id, movieContent);
    },

    deleteMovie: (_parent, { id, userId }, { auth, dataSources }) => {
        verifyAuth(auth, userId);
        return dataSources.mongoDataSource.deleteMovie(id);
    }
};
