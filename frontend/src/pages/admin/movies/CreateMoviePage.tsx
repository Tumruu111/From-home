import { CreateMovieForm } from "@/modules/admin/movies/CreateMovieForm";

export const CreateMoviePage = () => {
  return (
    <div className="min-h-full flex items-start justify-center pt-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Movie</h1>
        <CreateMovieForm />
      </div>
    </div>
  );
};
