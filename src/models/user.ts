import { Schema, model } from "mongoose";

interface IUser {
    email: string;
    name: string;
    hash: string;
    salt: string;
    shareBooks: boolean;
    shareMovies: boolean;
}

const userSchema = new Schema<IUser>({
    email: String,
    name: String,
    hash: String,
    salt: String,
    shareBooks: Boolean,
    shareMovies: Boolean,
  });
  
export const registerUserModel = () => model<IUser>("User", userSchema);
