import { IContext } from "../index.js";
import { IUser } from "../types/users.js";
import { Users } from "../models/user.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

export const userMutations = {
  login: async (_root: any, { input }: { input: IUser }) => {
    const { email, password } = input;
    const user = await Users.findOne({ email });
    console.log(user);
    if (!user) {
      return "email not found";
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return "invalid  password";
    }
    const token = jwt.sign(
      {
        email: user.email,
      },
      SECRET_KEY,
      { expiresIn: "2h" },
    );
    return token;
  },
  signup: async (_root: any, { input }: { input: IUser }) => {
    const { email, password } = input;
  },
};
