import { MovieForm } from "./MovieForm";
import type { MovieFormValues } from "./MovieForm";

export const CreateMovieForm = () => {
  const handleCreateMovie = (data: MovieFormValues) => {
    console.log("Movie created:", data);
  };

  return <MovieForm submitLabel="Create Movie" onSubmit={handleCreateMovie} />;
};
