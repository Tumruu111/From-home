import { Router } from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  editMovie,
} from "../controllers/movieControllers";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/create-movie", createMovie);
router.patch("/edit-movie/:id", editMovie);

export default router;
