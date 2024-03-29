import { registerUserModel } from "./user";
import { registerBookModel } from "./book";
import { registerMovieModel } from "./movie";

export const registerModels = () => {
    registerUserModel();
    registerBookModel();
    registerMovieModel();
};
