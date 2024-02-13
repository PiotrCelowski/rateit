import { Navigate, Outlet, useLoaderData } from "react-router-dom";

export const ProtectedRoute = ({
  redirectPath = '/login',
  children,
}) => {
  const { loggedIn } = useLoaderData()
  console.log('isAllowed', loggedIn)
  if (!loggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};