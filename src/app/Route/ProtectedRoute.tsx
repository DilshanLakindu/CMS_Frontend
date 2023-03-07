import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { access_token } = useSelector((state: any) => state.auth);

  if (!access_token) {
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet />;
}
