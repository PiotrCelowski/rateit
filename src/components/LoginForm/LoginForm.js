import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLocation, useNavigate } from "react-router-dom";
import {
  isUserAdmin,
  signInWithGoogle,
  signInWithFacebook,
  signInWithEmail,
} from "../../api/FirebaseAuthApi";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/loginSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../configuration/firebase/FirebaseCommon";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Divider, Stack } from "@mui/material";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { PasswordInput } from "../PasswordInput/PasswordInput";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setError] = useState([]);
  const [snackbarOpened, setSnackbarOpened] = useState(false);

  const sumbitHandler = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    signInWithEmail(
      data.get("email"),
      data.get("password"),
      data.get("rememberMe")
    )
      .then(() => setAuthCallback())
      .catch((error) => {
        setError(error.message);
        setSnackbarOpened(true);
      });
  };

  const closeSnackbar = () => {
    setSnackbarOpened(false);
  };

  const facebookHandler = async (event) => {
    try {
      await signInWithFacebook();
      setAuthCallback();
    } catch (error) {
      console.log("signInWithFacebook [error]:", error?.message);
      setError(error?.message || "Error: Auth with Facebook was not completed");
      setSnackbarOpened(true);
    }
  };

  const googleHandler = async (event) => {
    try {
      await signInWithGoogle();
      setAuthCallback();
    } catch (error) {
      console.log("signInWithGoogle [error]:", error?.message);
      setError(error?.message || "Error: Auth with Google was not completed");
      setSnackbarOpened(true);
    }
  };
  const location = useLocation()
  const navigatePath = location?.state?.from ? location?.state?.from?.pathname : '/'

  function setAuthCallback() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult().then((token) => {
          dispatch(loginActions.setLoggedIn(true));
          if (isUserAdmin(token)) dispatch(loginActions.setAdmin(true));
          navigate(navigatePath, { state: { message: "Login successfull!" } });
        });
      } else {
        //do nothing
      }
    });
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ paddingY: 4, my: { xs: 1, sm: 4 } }}>
      <Stack direction="column" rowGap={2} width={"100%"}>
        <Typography component="h1" variant="h5" textAlign={"center"} mb={1}>
          Sign In
        </Typography>
        <Stack component="form" onSubmit={sumbitHandler} direction="column" width={"100%"} rowGap={2.5}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <PasswordInput
            required
            name="password"
            autoComplete="current-password"
          />

          <Stack direction="row" columnGap={1} alignItems="baseline">
            <Box sx={{ flexGrow: 1 }}>
              <FormControlLabel
                control={<Checkbox color="primary" defaultChecked />}
                name="rememberMe"
                label="Remember me"
              />
            </Box>
            {/* Todo: uncomment when forgot password feature will be added */}
            {/* <Link href="#" variant="body2">
              Forgot password?
            </Link> */}
          </Stack>

          <PrimaryButton type="submit" variant="contained" size="large">
            Sign In
          </PrimaryButton>

          <Stack direction={"row"} columnGap={1.5} justifyContent={"center"} mt={2}>
            <Typography variant="body2">New on our platform?</Typography>
            <Link href="/register" variant="body2">
              Create an account
            </Link>
          </Stack>

          <Divider />

          <Stack mt={1} direction={"row"} columnGap={5} justifyContent="center" alignItems="center">
            <Typography component={"div"} variant="overline" color="text.secondary">
              Or sign in with
            </Typography>

            <IconButton onClick={googleHandler} color="default" size="large">
              <GoogleIcon />
            </IconButton>

            <IconButton onClick={facebookHandler} color="default" size="large">
              <FacebookIcon />
            </IconButton>
          </Stack>

        </Stack>
      </Stack>
      <Snackbar open={snackbarOpened} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
