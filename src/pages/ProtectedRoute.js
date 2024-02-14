import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const loggedIn = useSelector((state) => state.login.isLoggedIn);
  const location = useLocation();

  if (!loggedIn) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};
