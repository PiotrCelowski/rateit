import React, { useCallback, useState } from "react";
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deepOrange } from '@mui/material/colors';

const Bar = () => {
  const loggedIn = useSelector((state) => state.login.isLoggedIn);
  const isAdmin = useSelector((state) => state.login.isAdmin);
  const userEmail = useSelector((state) => state.login.email);
  const userPhoto = useSelector((state) => state.login.imageUrl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpened = Boolean(anchorEl);
  const [firstLetter, setFirstLetter] = useState('');

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
        dispatch(loginActions.setUserId(user.uid))
        setFirstLetter(user.email.charAt(0).toUpperCase());
      } else {
      }
    },
    [dispatch, handleAdminRigths]
  );

  useEffect(() => {
    onAuthStateChanged(auth, authStateObserver);
  }, [authStateObserver]);

  const logoutHandler = async () => {
    closeMenu();

    await signOutUser();

    if (!isUserSignedIn()) {
      localStorage.removeItem("token");
      dispatch(loginActions.setLoggedIn(isUserSignedIn()));
    }

    navigate("/", { state: { message: "Logged out successfully." } });
  };

  const accountSettingsHandler = () => {
    navigate("/user");
  }

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

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
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
              <Avatar sx={{ bgcolor: deepOrange[500], cursor: "pointer", marginLeft: "10px", marginRight: "10px"}} onClick={openMenu} src={userPhoto ? userPhoto : ''} >
                {firstLetter}
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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpened}
        onClose={closeMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={accountSettingsHandler}>Account settings</MenuItem>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Bar;
