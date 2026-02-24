import { Router } from "express";
import {
  getMovies,
  getMovieById,
  getMovieByGenre,
} from "../controllers/movieController";

const router = Router();

router.get("/", getMovies);
router.get("/genres", getMovieByGenre);
router.get("/:id", getMovieById);

export default router;
