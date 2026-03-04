import type { Movie } from "@/types/movie";
const BASE_URL = "http://localhost:3000/api";

export const useAddMovie = () => {
  const addMovie = async (movie: Movie) => {
    try {
      const res = await fetch(`${BASE_URL}/movie/addMovie"`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      const data = await res.json();

      console.log("SUCCESS:", data);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  return { addMovie };
};
