import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import {
  isUserAdmin,
  signInWithGoogle,
  signInWithFacebook,
  signInWithEmail,
} from "../../firebase/FirebaseAuthApi";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/loginSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/FirebaseCommon";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import IconButton from "@mui/material/IconButton";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sumbitHandler = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    await signInWithEmail(
      data.get("email"),
      data.get("password"),
      data.get("rememberMe")
    );

    setAuthCallback();
  };

  const facebookHandler = async (event) => {
    await signInWithFacebook();
    setAuthCallback();
  };

  const googleHandler = async (event) => {
    await signInWithGoogle();
    setAuthCallback();
  };

  function setAuthCallback() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult().then((token) => {
          dispatch(loginActions.setLoggedIn(true));
          if (isUserAdmin(token)) dispatch(loginActions.setAdmin(true));
          navigate("/");
        });
      } else {
        //do nothing
      }
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={sumbitHandler} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid container>
            <Grid item xs={10}>
              <FormControlLabel
                control={<Checkbox color="primary" defaultChecked />}
                name="rememberMe"
                label="Remember me"
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={googleHandler}
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <GoogleIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={facebookHandler}
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <FacebookIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
