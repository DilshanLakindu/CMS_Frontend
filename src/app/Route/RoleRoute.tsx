import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface RoleRouteProps {
  allowedRoles: [string];
}
const ROLES = ["admin", "user"];

export default function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { access_token, userRole } = useSelector((state: any) => state.auth);

  const location = useLocation();
  console.log("RoleRoute -> location", location, userRole, allowedRoles);
  return ROLES.includes(userRole) && allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : access_token ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
