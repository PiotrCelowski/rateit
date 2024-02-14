import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Bar from '../components/Bar/Bar'
import Footer from "../components/Footer/Footer";
import Stack from '@mui/material/Stack';
import CookieBanner from "../components/CookieBanner/CookieBanner";
import { ThemeProvider } from "@mui/material";
import { mainTheme } from "../themes/purpleTheme";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBarMessage = () => {
    const location = useLocation();
    const [snackbarOpened, setSnackbarOpened] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);
            setSnackbarOpened(true);
            window.history.replaceState({}, document.title);
        }
    }
        , [location.state?.message])

    const closeSnackbar = () => {
        setSnackbarOpened(false);
    }

    return (
        <Snackbar open={snackbarOpened} autoHideDuration={6000} onClose={closeSnackbar}>
            <Alert onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

function RootLayout() {
    return (
        <ThemeProvider theme={mainTheme}>
            <Stack spacing={0} minHeight={"100vh"} sx={{ display: 'flex', flexDirection: "column", justifyItems: "flex-start" }}>
                <Bar />
                <Outlet />
                <Footer />
            </Stack>
            <CookieBanner />
            <SnackBarMessage />
        </ThemeProvider>
    )
}

export default RootLayout;