import { Schema, Types, model } from "mongoose";

interface IMovie {
    userId: string;
    title: string;
    year: string;
    notes: string;
    completed: Date;
    imdbId: string;
}

const movieSchema = new Schema<IMovie>({
  userId: Types.ObjectId,
  title: String,
  year: String,
  notes: String,
  completed: Date,
  imdbId: String
});
  
export const registerMovieModel = () => model<IMovie>("Movie", movieSchema);
