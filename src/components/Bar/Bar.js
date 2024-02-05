import React, { useCallback, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { isUserSignedIn, signOutUser } from "../../api/FirebaseAuthApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginActions } from "../../store/loginSlice";
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUser } from "../../api/FirebaseAuthApi";
import { auth } from "../../configuration/firebase/FirebaseCommon";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deepOrange } from "@mui/material/colors";
import { Container, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import { Logo } from "../Logo/LogoIcon";
import { MobileMenu } from "./MobileMenu";
import { lightPurpleTheme } from "../../themes/purpleTheme";
import { BarButton } from "./BarButton";

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
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

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
  const appBarMenuItems = ({ loggedIn, isAdmin, isMobile }) => (
    <>
      {loggedIn ? (
        <>
          {isAdmin && (
            <>
              <BarButton onClick={approvedCoursesHandler}>
                Approved courses
              </BarButton>
              <BarButton onClick={pendingCoursesHandler}>
                Pending courses
              </BarButton>
            </>
          )}

          <BarButton onClick={proposeCourseHandler}>
            Propose course
          </BarButton>
          <Avatar
            sx={{ bgcolor: deepOrange[500], cursor: "pointer", marginLeft: "10px", marginRight: "10px" }}
            onClick={openMenu}
            src={userPhoto ? userPhoto : ""}
          >
            {firstLetter}
          </Avatar>
        </>
      ) : (
        <>
          <BarButton onClick={signInHandler}>
            Sign in
          </BarButton>
          <BarButton variant='outlined' onClick={signUpHandler}>
            Sign up
          </BarButton>
        </>
      )}
    </>
  )

  return (
    <ThemeProvider theme={lightPurpleTheme}>
      <Box>
        <AppBar position="static" color='primary'>
          <Container maxWidth="xl" disableGutters>
            <Toolbar>
              <Box sx={{ flexGrow: 1 }}>
                <Logo onClick={goToMainPageHandler} />
              </Box>
              {isMobile
                ? <MobileMenu open={openMobileMenu} setOpen={setOpenMobileMenu}>
                  {appBarMenuItems({loggedIn, isAdmin, isMobile})}
                  </MobileMenu>
                : <>{appBarMenuItems({loggedIn, isAdmin, isMobile})}</>
              }
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      {!isMobile && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={menuOpened}
          onClose={closeMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={accountSettingsHandler}>Account settings</MenuItem>
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Menu>
      )}
    </ThemeProvider>
  );
};

export default Bar;
