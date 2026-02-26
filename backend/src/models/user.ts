import { Schema, model } from "mongoose";
import type { IUsersDocument } from "../types/users";

const userSchema = new Schema<IUsersDocument>({
  name: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Users = model<IUsersDocument>("users", userSchema);
