import { Request, Response } from "express";
import Movie from "../models/movie";

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 12);
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (req.query.search) {
      filter.title = { $regex: req.query.search as string, $options: "i" };
    }

    if (req.query.genre) {
      filter.genres = req.query.genre as string;
    }

    const [movies, total] = await Promise.all([
      Movie.find(filter)
        .skip(skip)
        .limit(limit)
        .select(
          "title year runtime genres directors cast plot poster rated imdb awards type",
        ),
      Movie.countDocuments(filter),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      movies,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMovieById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createMovie = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const editMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const editedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!editedMovie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    res.status(200).json(editedMovie);
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

export const deleteMovie = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deleteMovie) {
      res.status(404).json({ message: "Movie not found!" });
      return;
    }
    res.status(200).json(deletedMovie);
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};
