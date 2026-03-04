import { Router } from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
} from "../controllers/movieControllers";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/create-movie", createMovie);

export default router;
