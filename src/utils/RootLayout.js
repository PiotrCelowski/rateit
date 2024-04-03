import React from "react";
import { Outlet } from "react-router-dom";
import Bar from '../components/Bar/Bar'
import Footer from "../components/Footer/Footer";
import Stack from '@mui/material/Stack';
import CookieBanner from "../components/CookieBanner/CookieBanner";
import { ThemeProvider } from "@mui/material";
import { mainTheme } from "../themes/purpleTheme";
import { SnackBarMessage } from "../components/SnackbarMessage/SnackbarMessage";

function RootLayout({ children }) {
    return (
        <ThemeProvider theme={mainTheme}>
            <Stack spacing={0} minHeight={"100vh"} sx={{ display: 'flex', flexDirection: "column", justifyItems: "flex-start" }}>
                <Bar />
                {children || <Outlet />}
                <Footer />
            </Stack>
            <CookieBanner />
            <SnackBarMessage />
        </ThemeProvider>
    )
}

export default RootLayout;
