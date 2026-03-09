import { EditMovieForm } from "@/modules/admin/movies/EditMovieForm";
import { useParams } from "react-router-dom";

export const EditMoviePage = () => {
  const { id } = useParams();

  if (!id) return <p>Movie not found</p>;

  return (
    <div className="min-h-full flex items-start justify-center pt-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Movie</h1>
        <EditMovieForm _id={id} />
      </div>
    </div>
  );
};
