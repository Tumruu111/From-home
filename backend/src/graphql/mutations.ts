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

    if (!user) {
      return "email not found";
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return "invalid password";
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

    // check if user exists
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return "user already exists";
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await Users.create({
      email,
      password: hashedPassword,
    });

    // create token
    const token = jwt.sign(
      {
        email: newUser.email,
      },
      SECRET_KEY,
      { expiresIn: "2h" },
    );

    return token;
  },
};
