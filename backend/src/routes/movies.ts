import { Router } from "express";
import {
  getMovies,
  getMovieById,
  getMovieByGenre,
  login,
} from "../graphql/queries";

const router = Router();

router.get("/", getMovies);
router.get("/genres", getMovieByGenre);
router.get("/:id", getMovieById);
router.post("/login", login);

export default router;
