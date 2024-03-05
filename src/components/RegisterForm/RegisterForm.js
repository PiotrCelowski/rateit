import React, { useEffect, useState } from "react";
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
import { emailRule, passwordRule } from "../../utils/validateRules";
import { AuthErrorCodes } from "@firebase/auth";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
  const { control, watch, handleSubmit, formState: { errors, dirtyFields }, trigger, setError } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmation: ''
    }
  })

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState([]);
  const [snackbarOpened, setSnackbarOpened] = useState(false);

  const onSubmit = async ({ email, password }) => {
    try {
      await signUpWithEmail(email, password)
      navigate("/", {
        state: { message: "Account was created successfully!" },
      })
    } catch (error) {
      if (error?.code === AuthErrorCodes.EMAIL_EXISTS) {
        // -- set error state to the email input field and use toast notification --
        // setError('email', { type: 'firebaseError' }, { shouldFocus: true })
        // -- or set error message directly to the email input field --
        return setError('email', { type: 'firebaseError', message: 'This email already in use' }, { shouldFocus: true })
      }
      if (error?.code === AuthErrorCodes.WEAK_PASSWORD) {
        // -- set error state to the password input field and use toast notification --
        // setError('password', { type: 'firebaseError' }, { shouldFocus: true })
        // -- or set error message directly to the email input field --
        return setError('password', { type: 'firebaseError', message: 'Password should be at least 6 characters' }, { shouldFocus: true })
      }
      setErrorMessage(error?.message || 'Server error. Try again later.');
      setSnackbarOpened(true);
    }
  };

  const closeSnackbar = () => {
    setSnackbarOpened(false);
  };

  const [ passwordValue, confirmationValue ] = watch(["password", 'confirmation'])
  useEffect(() => {
    if (dirtyFields?.password && dirtyFields?.confirmation) {
      // -- revalidates both fields onChange one of them --
      trigger(['password', 'confirmation'])
    }
  }, [passwordValue, confirmationValue])

  return (
    <>
      <Stack direction="column" rowGap={2} width={"100%"}>
        <Typography component="h1" variant="h5" textAlign={"center"} mb={1}>
          Create account
        </Typography>
        <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} direction="column" width={"100%"} rowGap={2.5}>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required", ...emailRule }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                inputRef={ref}
                error={Boolean(errors?.email)}
                helperText={errors?.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required", ...passwordRule }}
            render={({ field }) => (
              <PasswordInput
                {...field}
                autoComplete="new-password"
                label="Password"
                type="password"
                id="password"
                error={Boolean(errors?.password) || Boolean(errors?.confirmation?.type === 'validate')}
                errorMessage={errors?.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmation"
            rules={{ required: "Confirm your password", validate: (value) => passwordValue === value || 'The passwords do not match' }}
            render={({ field }) => (
              <PasswordInput
                {...field}
                autoComplete="new-password"
                label="Confirm password"
                id="confirmation"
                error={Boolean(errors?.confirmation)}
                errorMessage={errors?.confirmation?.message}
              />
            )}
          />
          <PrimaryButton
            type="submit"
            variant="contained"
            size="large"
            disabled={Boolean(Object.keys(errors)?.length)}
            sx={{ mt: 1 }}
          >
            Sign Up
          </PrimaryButton>
        </Stack>
        <Stack direction={"row"} columnGap={1.5} justifyContent={"center"} mt={2}>
          <Typography variant="body2">Already have an account?</Typography>
          <Link href="/login" variant="body2">
            Sign In
          </Link>
        </Stack>
      </Stack>
      <Snackbar open={snackbarOpened} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
