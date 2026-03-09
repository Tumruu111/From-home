import { useEffect, useState } from "react";
import { editMovie, getMovie } from "@/services/api";
import { MovieForm, type MovieFormValues } from "./MovieForm";

type Props = {
  _id: string;
};

export const EditMovieForm = ({ _id }: Props) => {
  const [defaultValues, setDefaultValues] = useState<MovieFormValues | null>(
    null,
  );
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovie(_id);

        const normalizedData: MovieFormValues = {
          title: movieData.title || "",
          year: movieData.year || new Date().getFullYear(),
          genres: movieData.genres || [],
          directors: movieData.directors || [],
          cast: movieData.cast || [],
          plot: movieData.plot || "",
          poster: movieData.poster || "",
          runtime: movieData.runtime || 1,
          languages: movieData.languages || [],
          countries: movieData.countries || [],
          imdb: {
            rating: movieData.imdb?.rating || 0,
            votes: movieData.imdb?.votes || 0,
          },
          awards: {
            wins: movieData.awards?.wins || 0,
            nominations: movieData.awards?.nominations || 0,
            text: movieData.awards?.text || "",
          },
        };

        setDefaultValues(normalizedData);
      } catch (err) {
        console.error(err);
        alert("Failed to load movie data.");
      }
    };

    fetchMovie();
  }, [_id]);

  const handleEditMovie = async (data: MovieFormValues) => {
    try {
      setIsPending(true);
      await editMovie(data, _id);

      alert("Movie updated successfully!");
    } catch (error) {
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
