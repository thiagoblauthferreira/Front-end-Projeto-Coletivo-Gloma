import { Navigate, Outlet } from "react-router-dom";
import { useAuthProvider } from "../../context/Auth";
import { typeRoles } from "../../interfaces/auth";

export function PrivateRoleRoute({ roles }: { roles: typeRoles[] }) {
  const { currentUser } = useAuthProvider();

  const hasRequiredRole = roles.some((role) => currentUser?.roles.includes(role));

  if (!hasRequiredRole) {
    return <Navigate to={"/home"} />;
  }

  return <Outlet />;
}
