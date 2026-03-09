import type { Movie, MoviesResponse } from "@/types/movie";
import type { MovieFormValues } from "@/modules/admin/movies/MovieForm";
import { id } from "zod/v4/locales";
import { data } from "react-router-dom";

const BASE_URL = "http://localhost:3000/api";

const getHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("auth-token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface GetMoviesParams {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
}

export const getMovies = async (
  params: GetMoviesParams = {},
): Promise<MoviesResponse> => {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("search", params.search);
  if (params.genre) query.set("genre", params.genre);

  const res = await fetch(`${BASE_URL}/movies?${query}`, {
    headers: getHeaders(),
  });
  return res.json();
};

export const getMovie = async (id: string): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    headers: getHeaders(),
  });
  return res.json();
};

export const getUser = async (): Promise<{ id: string }> => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: getHeaders(),
  });
  return res.json();
};

export const login = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
};
export const getGenres = async () => {};

export const createMovie = async (data: MovieFormValues): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/movies/create-movie`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Attempt unsuccessful");

  return res.json();
};
export const editMovie = async (
  data: MovieFormValues,
  _id: string,
): Promise<MovieFormValues> => {
  const res = await fetch(`${BASE_URL}/movies/edit-movie/${_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to edit movie!");
  return res.json();
};

export const deleteMovie = async (
  _id: string,
  data: MovieFormValues,
): Promise<void> => {
  const res = await fetch(`${BASE_URL}/movies/delete-movies/${_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to delete movie!");
  return res.json();
};
