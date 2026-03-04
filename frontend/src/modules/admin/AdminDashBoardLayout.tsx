import { NavLink, Outlet, Link } from "react-router-dom";
import { Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth/useAuthContext";

export const AdminDashboardLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-56 bg-gray-900 text-white flex flex-col">
        <div className="p-5 border-b border-gray-700">
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLink
            to="/admin/movies"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <Film size={16} />
            Movies
          </NavLink>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="text-sm text-gray-400 hover:text-white w-full text-left"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b flex items-center justify-between px-6 shrink-0">
          <h2 className="text-base font-semibold text-gray-700">Dashboard</h2>
          <Link to="/admin/create-movie">
            <Button size="sm">+ Create Movie</Button>
          </Link>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
