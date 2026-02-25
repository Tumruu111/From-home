import { useState } from "react";
import { useAddMovie } from "../hooks/useAddMovie";
import { Link, ArrowLeft } from "lucide-react";

export const AddMovie = () => {
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
    try {
      if (!title || !plot || !directors || !year || !genres || !runtime) {
        alert("Please fill every section!");
        return;
      }

      const result = await addMovie({
        poster,
        title,
        plot,
        directors: directors.split(","),
        year: Number(year),
        genres: genres.split(","),
        runtime: Number(runtime),
        imdb: {
          rating: Number(rating),
        },
        fullplot,
      });
      console.log("Successful", result);

      alert("Movie added successfully!");

      setTitle("");
      setPlot("");
      setDirector("");
      setYear("");
      setGenre("");
      setRuntime("");
      setPoster("");
      setFullPlot("");
      setRating("");
    } catch (error) {
      console.error(error);
      alert("Failed to add movie!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <Link
        to="/movies"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-yellow-400 transition-colors font-medium mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
        Back to movies
      </Link>

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl p-8 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Add New Movie
        </h1>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Movie title"
          className="bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
        />

        <input
          value={plot}
          onChange={(e) => setPlot(e.target.value)}
          placeholder="Plot"
          className="bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
        />

        <input
          value={directors}
          onChange={(e) => setDirector(e.target.value)}
          placeholder="Directors (comma separated)"
          className="bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
        />

        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Release year"
          className="bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
        />

        <input
          value={genres}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genres (comma separated)"
          className="bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
        />

        <input
          value={runtime}
          onChange={(e) => setRuntime(e.target.value)}
          placeholder="Runtime (minutes)"
          className="bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
        />

        <input
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="IMDB rating"
          className="bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 transition"
        />

        <input
          value={fullplot}
          onChange={(e) => setFullPlot(e.target.value)}
          placeholder="Enter full plot..."
          className="bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 transition"
        />

        <input
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          placeholder="Enter poster img.."
          className="bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 transition"
        />

        <button
          onClick={movieAdd}
          className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]"
        >
          Add Movie
        </button>
      </div>
    </div>
  );
};
