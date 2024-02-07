import React, { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginActions } from "../../store/loginSlice";
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUser } from "../../api/FirebaseAuthApi";
import { auth } from "../../configuration/firebase/FirebaseCommon";
import { Container, ThemeProvider } from "@mui/material";
import { Logo } from "../Logo/LogoIcon";
import { lightPurpleTheme } from "../../themes/purpleTheme";
import { NavigationPanel } from "./NavigationPanel";

const Bar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminRigths = useCallback(async () => {
    const token = await getCurrentUser().getIdTokenResult();
    dispatch(loginActions.setAdmin(token.claims.role === 'admin'));
  }, [dispatch]);

  const authStateObserver = useCallback(
    (user) => {
      if (user) {
        dispatch(loginActions.setLoggedIn(true));
        handleAdminRigths();
        dispatch(loginActions.setEmail(user.email));
        dispatch(loginActions.setImageUrl(user.photoURL));
        dispatch(loginActions.setUserId(user.uid));
      } else {
      }
    },
    [dispatch, handleAdminRigths]
  );

  useEffect(() => {
    onAuthStateChanged(auth, authStateObserver);
  }, [authStateObserver]);

  const goToMainPageHandler = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={lightPurpleTheme}>
        <AppBar
          position="static"
          color='primary'
          sx={{
            minHeight: { md: 88 },
            placeContent: 'center',
            boxShadow: 'none'
          }}
        >
          <Container maxWidth="xl" disableGutters>
            <Toolbar sx={{ columnGap: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Logo onClick={goToMainPageHandler} />
              </Box>
              <NavigationPanel />
            </Toolbar>
          </Container>
        </AppBar>
    </ThemeProvider>
  );
};

export default Bar;
