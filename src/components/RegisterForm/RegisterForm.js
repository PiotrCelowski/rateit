import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { signUpWithEmail } from "../../api/FirebaseAuthApi";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
    const navigate = useNavigate();
    const [errorMessage, setError] = useState([]);
    const [snackbarOpened, setSnackbarOpened] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true);
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [email, setEmail] = useState('');
    const [buttonEnabled, setButtonEnabled] = useState(false);

    const sumbitHandler = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        signUpWithEmail(data.get("email"), data.get("password"))
            .then(() => navigate("/", { state: { message: "Account was created successfully!" } }))
            .catch((error) => {
                setError(error.message);
                setSnackbarOpened(true);
            });
    };

    const closeSnackbar = () => {
        setSnackbarOpened(false);
    };

    const saveEmail = (event) => {
        setEmail(event.currentTarget.value);
        checkPasswordAndEnableButton(password, confirmedPassword, event.currentTarget.value);
    }

    const saveConfirmedPassword = (event) => {
        setConfirmedPassword(event.currentTarget.value);
        checkPasswordAndEnableButton(password, event.currentTarget.value, email);
    }

    const savePassword = (event) => {
        setPassword(event.currentTarget.value);
        checkPasswordAndEnableButton(event.currentTarget.value, confirmedPassword, email);
    }

    function checkPasswordAndEnableButton(password, confirmation, emailParam) {
        setIsPasswordConfirmed(false);
        setButtonEnabled(false);
        if (password === confirmation && password.length > 0) {
            setIsPasswordConfirmed(true);
            if (emailParam.length > 0) {
                setButtonEnabled(true);
            }
        }
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
                    Create account
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
                        onChange={saveEmail}
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
                        onChange={savePassword}
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirm-password"
                        label="Confirm password"
                        type="password"
                        onChange={saveConfirmedPassword}
                        id="confirm-password"
                        error={Boolean(!isPasswordConfirmed)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={Boolean(!buttonEnabled)}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
            <Snackbar open={snackbarOpened} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}