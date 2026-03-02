import { Request, Response } from "express";
import Movies from "../models/Movie";

export const movieQueries = {
  getMovies: async (req: Request, res: Response): Promise<void> => {
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
        Movies.find(filter)
          .skip(skip)
          .limit(limit)
          .select(
            "title year runtime genres directors cast plot poster rated imdb awards type",
          ),
        Movies.countDocuments(filter),
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
  },

  getMovieById: async (req: Request, res: Response): Promise<void> => {
    try {
      const movie = await Movies.findById(req.params.id);

      if (!movie) {
        res.status(404).json({ message: "Movie not found" });
        return;
      }

      res.json(movie);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getGenres: async (_req: Request, res: Response): Promise<void> => {
    try {
      const genres: string[] = await Movies.distinct("genres");

      res.json(genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
      res.status(500).json({ message: "Failed to fetch genres" });
    }
  },
};
