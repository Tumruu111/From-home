import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MoviesPage from "@/pages/movies/MoviesPage";
import MovieDetailPage from "@/pages/movies/MovieDetailPage";
import { AddMovie } from "./modules/movies/components/AddMovie";
import { AuthProvderEffect } from "./modules/admin/auth/AuthProviderEffect";
import { AdminLayout } from "./modules/admin/AdminLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/addMovie" element={<AddMovie />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route element={<AuthProvderEffect />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="create-movie" element={<div>create-movie</div>} />
            <Route path="get-comments" element={<div>get-movies</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
