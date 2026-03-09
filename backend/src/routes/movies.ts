import { Router } from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  editMovie,
  deleteMovie,
} from "../controllers/movieControllers";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/create-movie", createMovie);
router.put("/edit-movie/:id", editMovie);
router.delete("/delete-movie/:id", deleteMovie);

export default router;
