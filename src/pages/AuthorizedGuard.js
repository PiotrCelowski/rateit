import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AuthorizedGuard = () => {
  // -- guest guard: user should not see login/signup pages if already logged in --
  const loggedIn = useSelector(({ login }) => login.isLoggedIn);
  const location = useLocation()
  const redirectPath = location?.state?.from ? location.state.from : '/'

  // -- redirects already authorized user from auth pages back to previous location --
  return (
    loggedIn
    ? <Navigate to={redirectPath} replace />
    : <Outlet />
  )
}
