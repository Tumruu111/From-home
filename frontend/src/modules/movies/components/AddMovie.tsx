import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddMovie } from "../hooks/useAddMovie";

export const AddMovie = () => {
  const navigate = useNavigate();
  const { addMovie } = useAddMovie();

  const [title, setTitle] = useState("");
  const [plot, setPlot] = useState("");
  const [directors, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenre] = useState("");
  const [runtime, setRuntime] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [fullplot, setFullPlot] = useState("");

  const movieAdd = async () => {
    if (!title || !plot || !directors || !year || !genres || !runtime) {
      alert("Fill every field");
      return;
    }

    await addMovie({
      poster,
      title,
      plot,
      directors: directors.split(","),
      year: Number(year),
      genres: genres.split(","),
      runtime: Number(runtime),
      imdb: { rating: Number(rating) },
      fullplot,
    });

    alert("Movie added!");

    navigate("/movies");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 p-6 rounded-xl flex flex-col gap-3">
        <h1 className="text-xl text-white font-bold text-center">Add Movie</h1>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Plot"
          value={plot}
          onChange={(e) => setPlot(e.target.value)}
        />
        <input
          placeholder="Directors comma separated"
          value={directors}
          onChange={(e) => setDirector(e.target.value)}
        />
        <input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          placeholder="Genres comma separated"
          value={genres}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          placeholder="Runtime"
          value={runtime}
          onChange={(e) => setRuntime(e.target.value)}
        />
        <input
          placeholder="IMDB rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />
        <input
          placeholder="Full plot"
          value={fullplot}
          onChange={(e) => setFullPlot(e.target.value)}
        />

        <button
          onClick={movieAdd}
          className="bg-blue-600 text-white rounded-lg py-2"
        >
          Add Movie
        </button>
      </div>
    </div>
  );
};
