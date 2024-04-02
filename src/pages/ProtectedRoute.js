import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const loggedIn = useSelector((state) => state.login.isLoggedIn);
  const location = useLocation();

  if (loggedIn === undefined) return null

  return (
    loggedIn
    ? <Outlet /> 
    : <Navigate to={redirectPath} state={{ from: location }} replace />
  )

};
