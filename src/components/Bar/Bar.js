import React, { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { isUserSignedIn, signOutUser } from "../../api/FirebaseAuthApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginActions } from "../../store/loginSlice";
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUser } from "../../api/FirebaseAuthApi";
import { auth } from "../../configuration/firebase/FirebaseCommon";
import Avatar from '@mui/material/Avatar';

const Bar = () => {
  const loggedIn = useSelector((state) => state.login.isLoggedIn);
  const isAdmin = useSelector((state) => state.login.isAdmin);
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
      } else {
      }
    },
    [dispatch, handleAdminRigths]
  );

  useEffect(() => {
    onAuthStateChanged(auth, authStateObserver);
  }, [authStateObserver]);

  const logoutHandler = async () => {
    await signOutUser();

    if (!isUserSignedIn()) {
      localStorage.removeItem("token");
      dispatch(loginActions.setLoggedIn(isUserSignedIn()));
    }

    navigate("/", { state: { message: "Logged out successfully." } });
  };

  const signUpHandler = () => {
    navigate("/register");
  };

  const signInHandler = () => {
    navigate("/login");
  };

  const proposeCourseHandler = () => {
    navigate("/propose");
  };

  const pendingCoursesHandler = () => {
    navigate("/pending");
  };

  const approvedCoursesHandler = () => {
    navigate("/");
  };

  const goToMainPageHandler = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={goToMainPageHandler}
          >
            R4te it!
          </Typography>
          {loggedIn && isAdmin && (
            <Button color="inherit" onClick={approvedCoursesHandler}>
              Approved courses
            </Button>
          )}
          {loggedIn && isAdmin && (
            <Button color="inherit" onClick={pendingCoursesHandler}>
              Pending courses
            </Button>
          )}
          {loggedIn && (
            <Button color="inherit" onClick={proposeCourseHandler}>
              Propose course
            </Button>
          )}
          {loggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Log out
            </Button>
          )}
          {loggedIn && (
            <Avatar>
              PC
            </Avatar>
          )}
          {!loggedIn && (
            <Button color="inherit" onClick={signUpHandler}>
              Sign up
            </Button>
          )}
          {!loggedIn && (
            <Button color="inherit" onClick={signInHandler}>
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Bar;
