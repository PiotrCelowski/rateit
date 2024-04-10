import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

// -- admin guard: user should not get access to admin pages --
export const AdminRoutesGuard = () => {
  // -- gets currentUser status from redux state --
  const isAdmin = useSelector(state => state.login?.isAdmin)
  const loggedIn = useSelector(state => state.login?.isLoggedIn);

  // -- allow current user to see the admin pages only if they are logged in and have admin role, otherwise redirect to home page --
  return (
    loggedIn && isAdmin
    ? <Outlet />
    : <Navigate to={'/'} replace />
  )
}
