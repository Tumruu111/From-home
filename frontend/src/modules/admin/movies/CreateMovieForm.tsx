import { MovieForm, type MovieFormValues } from "./MovieForm";
import { createMovie } from "@/services/api";

export const CreateMovieForm = () => {
  const handleCreateMovie = async (data: MovieFormValues) => {
    try {
      const movie = await createMovie(data);
      console.log("Movie saved:", movie);
    } catch (error) {
      console.error(error);
    }
  };

  return <MovieForm submitLabel="Create Movie" onSubmit={handleCreateMovie} />;
};
