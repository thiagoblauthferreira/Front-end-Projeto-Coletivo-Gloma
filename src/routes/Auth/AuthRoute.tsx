import { Navigate, Outlet } from "react-router-dom";
import { useAuthProvider } from "../../context/Auth";
import { getCookie } from "../../services/cookie.service";

export function AuthRoute() {
  const { currentUser } = useAuthProvider();

  const token = getCookie("token");

  if (token && currentUser) return <Navigate to={"/shelters"} />;

  return <Outlet />;
}
