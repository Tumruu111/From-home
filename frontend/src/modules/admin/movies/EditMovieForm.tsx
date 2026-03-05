import { MovieForm, type MovieFormValues } from "./MovieForm";

export const EditMovieForm = () => {
  const handleSubmit = (data: MovieFormValues) => {
    console.log("Edited movie:", data);
  };

  return <MovieForm submitLabel="Save Changes" onSubmit={handleSubmit} />;
};
