import { AuthContext } from "./useAuthContext";
import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./hooks/useUser";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("auth-token"),
  );

  const { data, isLoading } = useUser(!!token);

  const login = (token: string) => {
    localStorage.setItem("auth-token", token);
    setToken(token);
    navigate("/admin/movies");
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user: data || null, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
