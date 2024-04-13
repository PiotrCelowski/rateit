import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import {
  isUserAdmin,
  signInWithGoogle,
  signInWithFacebook,
  signInWithEmail,
} from "../../api/FirebaseAuthApi";
import { useDispatch } from "react-redux";
import { setAdmin, setLoggedIn } from "../../store/loginSlice";
import { AuthErrorCodes, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../configuration/firebase/FirebaseCommon";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Divider, Stack } from "@mui/material";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { useForm, Controller } from "react-hook-form";
import { emailRule, passwordRule } from "../../utils/validateRules";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState([]);
  const [snackbarOpened, setSnackbarOpened] = useState(false);

  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    }
  })
  const onSubmit = async ({ email, password, rememberMe }) => {
    try {
      await signInWithEmail(email, password, rememberMe)
      setAuthCallback()
    } catch (error) {
      // -- handle firebase errors with codes --
      if (error?.code === AuthErrorCodes.INVALID_PASSWORD) {
        // -- set error state to the password input field and use toast notification --
        // setError('password', { type: 'firebaseError' }, { shouldFocus: true })
        // -- or set error message directly to the password input field --
        return setError('password', { type: 'firebaseError', message: 'Wrong password' }, { shouldFocus: true });
      }
      if (error?.code === AuthErrorCodes.USER_DELETED) {
        // -- set error state to the email input field and use toast notification --
        // setError('email', { type: 'firebaseError' }, { shouldFocus: true })
        // -- or set error message directly to the email input field --
        return setError('email', { type: 'firebaseError', message: 'User not found' }, { shouldFocus: true });
      }
      setErrorMessage(error?.message || 'Server error. Try again later.');
      setSnackbarOpened(true);
    }
  }

  const closeSnackbar = () => {
    setSnackbarOpened(false);
  };

  const facebookHandler = async (event) => {
    try {
      await signInWithFacebook();
      setAuthCallback();
    } catch (error) {
      console.log("signInWithFacebook [error]:", error?.message);
      setErrorMessage(error?.message || "Error: Auth with Facebook was not completed");
      setSnackbarOpened(true);
    }
  };

  const googleHandler = async (event) => {
    try {
      await signInWithGoogle();
      setAuthCallback();
    } catch (error) {
      console.log("signInWithGoogle [error]:", error?.message);
      setErrorMessage(error?.message || "Error: Auth with Google was not completed");
      setSnackbarOpened(true);
    }
  };
  const location = useLocation()
  const navigatePath = location?.state?.from ? location?.state?.from?.pathname : '/'

  function setAuthCallback() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult().then((token) => {
          // ToDo: Decide should the token be stored in localStorage?

          // if (getValues('rememberMe') === true) {
          //   localStorage.setItem('token', token.token)
          // }

          dispatch(setLoggedIn(true));
          if (isUserAdmin(token)) dispatch(setAdmin(true));
          navigate(navigatePath, { state: { message: "Login successfull!" } });
        });
      } else {
        //do nothing
      }
    });
  }

  return (
    <>
      <Stack direction="column" rowGap={2} width={"100%"}>
        <Typography component="h1" variant="h5" textAlign={"center"} mb={1}>
          Sign In
        </Typography>
        <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} direction="column" width={"100%"} rowGap={2.5}>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required", ...emailRule }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                required
                fullWidth
                id="email"
                type='email'
                label="Email"
                autoComplete="email"
                autoFocus
                inputRef={ref}
                error={Boolean(errors.email)}
                helperText={errors?.email?.message}
              />
          )}/>
          <Controller
            control={control}
            name="password"
            rules={{ required: "Enter your password", minLength: passwordRule.minLength, maxLength: passwordRule.maxLength }}
            render={({ field }) => (
              <PasswordInput
                {...field}
                required
                name="password"
                autoComplete="current-password"
                error={Boolean(errors?.password)}
                errorMessage={errors?.password?.message}
              />
            )}
          />

          <Stack direction="row" columnGap={1} alignItems="baseline">
            <Box sx={{ flexGrow: 1 }}>
              <Controller
                control={control}
                name='rememberMe'
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={<Checkbox color="primary" checked={field?.value} />}
                    label="Remember me"
                  />
                )}
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

            <IconButton type='button' onClick={googleHandler} color="default" size="large">
              <GoogleIcon />
            </IconButton>

            <IconButton type='button' onClick={facebookHandler} color="default" size="large">
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
    </>
  );
}
