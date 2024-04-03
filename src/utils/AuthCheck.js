import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAdmin, setEmail, setImageUrl, setLoggedIn, setUserId } from "../store/loginSlice";
import { auth } from "../configuration/firebase/FirebaseCommon";
import { onAuthStateChanged } from "@firebase/auth";
import { getCurrentUser } from "../api/FirebaseAuthApi";
import { Outlet } from "react-router";


export const AuthCheck = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  const handleAdminRigths = useCallback(async () => {
    const token = await getCurrentUser().getIdTokenResult();
    dispatch(setAdmin(token.claims.role === 'admin'));
  }, [dispatch]);

  const authStateObserver = useCallback(
      async (user) => {
          if (user) {
              dispatch(setLoggedIn(true));
              handleAdminRigths();
              dispatch(setEmail(user.email));
              dispatch(setImageUrl(user.photoURL));
              dispatch(setUserId(user.uid));
          }
          setLoading(false)
    },
    [dispatch, handleAdminRigths]
  );

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, authStateObserver)
      return () => unsubscribe();
  }, [authStateObserver])

  const renderApp = children ? children : <Outlet />;

  return (!loading && renderApp)
}
