import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { signUpWithEmail } from "../../api/FirebaseAuthApi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Link, Stack } from "@mui/material";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { useForm, Controller } from "react-hook-form";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
  const { control, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmedPassword: ''
    }
  })
  console.log('errors', errors)

  const navigate = useNavigate();
  const [errorMessage, setError] = useState([]);
  const [snackbarOpened, setSnackbarOpened] = useState(false);
  // const [password, setPassword] = useState("");
  // const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true);
  // const [confirmedPassword, setConfirmedPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [buttonEnabled, setButtonEnabled] = useState(false);

  // const sumbitHandler = async (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   signUpWithEmail(data.get("email"), data.get("password"))
  //     .then(() =>
  //       navigate("/", {
  //         state: { message: "Account was created successfully!" },
  //       })
  //     )
  //     .catch((error) => {
  //       setError(error.message);
  //       setSnackbarOpened(true);
  //     });
  // };

  const onSubmit = async (data) => {
    console.log('data', data)
    // signUpWithEmail(data.get("email"), data.get("password"))
    //   .then(() =>
    //     navigate("/", {
    //       state: { message: "Account was created successfully!" },
    //     })
    //   )
    //   .catch((error) => {
    //     setError(error.message);
    //     setSnackbarOpened(true);
    //   });
  };

  const closeSnackbar = () => {
    setSnackbarOpened(false);
  };

  // const saveEmail = (event) => {
  //   setEmail(event.currentTarget.value);
  //   checkPasswordAndEnableButton(
  //     password,
  //     confirmedPassword,
  //     event.currentTarget.value
  //   );
  // };

  // const saveConfirmedPassword = (event) => {
  //   setConfirmedPassword(event.target.value);
  //   checkPasswordAndEnableButton(password, event.target.value, email);
  // };

  // const savePassword = (event) => {
  //   setPassword(event.target.value);
  //   checkPasswordAndEnableButton(event.target.value, confirmedPassword, email);
  // };

  // function checkPasswordAndEnableButton(password, confirmation, emailParam) {
  //   setIsPasswordConfirmed(false);
  //   setButtonEnabled(false);
  //   if (password === confirmation && password?.length > 0) {
  //     setIsPasswordConfirmed(true);
  //     if (emailParam?.length > 0) {
  //       setButtonEnabled(true);
  //     }
  //   }
  // }

  return (
    <>
      <Stack direction="column" rowGap={2} width={"100%"}>
        <Typography component="h1" variant="h5" textAlign={"center"} mb={1}>
          Create account
        </Typography>
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          direction="column"
          width={"100%"}
          rowGap={2.5}
        >
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <PasswordInput
                {...field}
                autoComplete="new-password"
                label="Password"
                type="password"
                id="password"
              />
            )}
          />
          <Controller
            control={control}
            name="confirmedPassword"
            rules={{ required: "Type password again" }}
            render={({ field }) => (
              <PasswordInput
                {...field}
                autoComplete="new-password"
                label="Confirm password"
                id="confirmedPassword"
                error={Boolean(errors?.confirmedPassword?.message)}
              />
            )}
          />
          <PrimaryButton
            type="submit"
            variant="contained"
            size="large"
            // disabled={Boolean(!buttonEnabled)}
            sx={{ mt: 1 }}
          >
            Sign Up
          </PrimaryButton>
        </Stack>
        <Stack
          direction={"row"}
          columnGap={1.5}
          justifyContent={"center"}
          mt={2}
        >
          <Typography variant="body2">Already have an account?</Typography>
          <Link href="/login" variant="body2">
            Sign In
          </Link>
        </Stack>
      </Stack>
      <Snackbar
        open={snackbarOpened}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
