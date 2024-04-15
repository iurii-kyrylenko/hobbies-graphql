import { registerUserModel } from "./user.js";
import { registerBookModel } from "./book.js";
import { registerMovieModel } from "./movie.js";

export const registerModels = () => {
    registerUserModel();
    registerBookModel();
    registerMovieModel();
};
