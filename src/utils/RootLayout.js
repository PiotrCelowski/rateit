import React, { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Bar from '../components/Bar/Bar'
import Footer from "../components/Footer/Footer";
import Stack from '@mui/material/Stack';
import CookieBanner from "../components/CookieBanner/CookieBanner";
import { ThemeProvider } from "@mui/material";
import { mainTheme } from "../themes/purpleTheme";
import { SnackBarMessage } from "../components/SnackbarMessage/SnackbarMessage";
import { useDispatch } from "react-redux";
import { setAdmin, setEmail, setImageUrl, setLoggedIn, setUserId } from "../store/loginSlice";
import { auth } from "../configuration/firebase/FirebaseCommon";
import { onAuthStateChanged } from "@firebase/auth";
import { getCurrentUser } from "../api/FirebaseAuthApi";

function RootLayout() {
    const dispatch = useDispatch();

    const handleAdminRigths = useCallback(async () => {
      const token = await getCurrentUser().getIdTokenResult();
      dispatch(setAdmin(token.claims.role === 'admin'));
    }, [dispatch]);
  
    const authStateObserver = useCallback(
        (user) => {
        if (user) {
          dispatch(setLoggedIn(true));
          handleAdminRigths();
          dispatch(setEmail(user.email));
          dispatch(setImageUrl(user.photoURL));
          dispatch(setUserId(user.uid));
        } else {
            console.log('what is the user now?', user)
        }
      },
      [dispatch, handleAdminRigths]
    );
  
    useEffect(() => {
      onAuthStateChanged(auth, authStateObserver);
    }, [authStateObserver]);

    return (
        <ThemeProvider theme={mainTheme}>
            <Stack spacing={0} minHeight={"100vh"} sx={{ display: 'flex', flexDirection: "column", justifyItems: "flex-start" }}>
                <Bar />
                <Outlet />
                <Footer />
            </Stack>
            <CookieBanner />
            <SnackBarMessage />
        </ThemeProvider>
    )
}

export default RootLayout;