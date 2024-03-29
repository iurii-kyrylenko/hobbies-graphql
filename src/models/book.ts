import { Schema, Types, model } from "mongoose";

export interface IBook {
    userId: string;
    title: string;
    author: string;
    completed: Date;
    mode: string;
}

const bookSchema = new Schema<IBook>({
    userId: Types.ObjectId,
    title: String,
    author: String,
    completed: Date,
    mode: String
  });
  
export const registerBookModel = () => model<IBook>("Book", bookSchema);
