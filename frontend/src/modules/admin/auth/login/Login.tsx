import { Navigate } from "react-router-dom";
import { useAuth } from "../useAuthContext";

export const Login = () => {
  const { login, user } = useAuth();

  if (user) {
    return <Navigate to={"/admin/create-movie"} />;
  }

  return <button onClick={() => login()}>Login</button>;
};
