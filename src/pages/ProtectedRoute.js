import { Navigate, Outlet, useLoaderData, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const { loggedIn } = useLoaderData();
  const location = useLocation();

  if (!loggedIn) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};
