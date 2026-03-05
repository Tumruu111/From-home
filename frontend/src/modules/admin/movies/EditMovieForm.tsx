import { editMovie } from "@/services/api";
import { MovieForm, type MovieFormValues } from "./MovieForm";

export const EditMovieForm = () => {
  const handleEditMovie = async (data: MovieFormValues) => {
    try {
      const editedMovie = await editMovie(data);
      console.log("Movie saved:", editedMovie);
    } catch (error) {
      console.error(error);
    }
  };

  return <MovieForm submitLabel="Save Changes" onSubmit={handleEditMovie} />;
};
