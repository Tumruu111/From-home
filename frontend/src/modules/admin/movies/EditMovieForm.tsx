import { useEffect, useState } from "react";
import { editMovie, getMovie } from "@/services/api";
import { MovieForm, type MovieFormValues } from "./MovieForm";

type Props = {
  movieId: string;
};

export const EditMovieForm = ({ movieId }: Props) => {
  const [defaultValues, setDefaultValues] = useState<MovieFormValues | null>(
    null,
  );
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovie(movieId);

        const normalizedData: MovieFormValues = {
          title: movieData.title || "",
          year: movieData.year || new Date().getFullYear(),
          genres: movieData.genres || [],
          directors: movieData.directors || [],
          cast: movieData.cast || [],
          plot: movieData.plot || "",
          poster: movieData.poster || "",
        };

        setDefaultValues(normalizedData);
      } catch (err) {
        console.error(err);
        alert("Failed to load movie data.");
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleEditMovie = async (data: MovieFormValues) => {
    try {
      setIsPending(true);
      const editedMovie = await editMovie(data, movieId);
      console.log("Movie saved:", editedMovie);
      alert("Movie updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update movie.");
    } finally {
      setIsPending(false);
    }
  };

  if (!defaultValues) return <div>Loading movie...</div>;

  return (
    <MovieForm
      submitLabel="Save Changes"
      defaultValues={defaultValues}
      onSubmit={handleEditMovie}
      isPending={isPending}
    />
  );
};
