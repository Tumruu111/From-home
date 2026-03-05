import { editMovie } from "@/services/api";
import { MovieForm, type MovieFormValues } from "./MovieForm";

type Props = {
  movieId: string;
};

export const EditMovieForm = ({ movieId }: Props) => {
  const handleEditMovie = async (data: MovieFormValues) => {
    try {
      const editedMovie = await editMovie(data, movieId);
      console.log("Movie saved:", editedMovie);
    } catch (error) {
      console.error(error);
    }
  };

  return <MovieForm submitLabel="Save Changes" onSubmit={handleEditMovie} />;
};
