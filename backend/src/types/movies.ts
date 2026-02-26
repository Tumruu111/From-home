import { Document } from "mongoose";
export interface IMovie {
  name: string;
  email: string;
  password: string;
  role: number;
}
export interface IMovieDocuments extends IMovie, Document {}
