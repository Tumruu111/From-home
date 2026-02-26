import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import moviesRouter from "./routes/movies";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";
import { Users } from "./models/user";
import { typeDefs, resolvers } from "./models/apolloServer";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "";
const SECRET_KEY = process.env.JWT_SECRET || "secret";

app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err);
  });

export interface IContext {
  user: {
    name: String;
  };
}

const server = new ApolloServer<IContext>({
  typeDefs,
  resolvers,
});

// const { url } = await startStandaloneServer<IContext>(server, {
//   context: async ({ req }) => {
//     const authHeader = req.headers.authorization || "";

//     let context: any = {};

//     try {
//       const decoded: any = jwt.verify(authHeader, SECRET_KEY);

//       const userData = await Users.findOne({
//         email: decoded.email,
//         role: decoded.role,
//       });
//       if (userData) {
//         context.user = userData;
//       }
//     } catch (error) {
//       return context;
//     }
//     return context;
//   },
// });
// console.log(`🚀  Server ready at: ${url}`);
export default app;
