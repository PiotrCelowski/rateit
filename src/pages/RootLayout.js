import React from "react";
import { Outlet } from "react-router-dom";
import Bar from '../components/Bar/Bar'
import Footer from "../components/Footer/Footer";
import Stack from '@mui/material/Stack';
import CookieBanner from "../components/CookieBanner/CookieBanner";
import { ThemeProvider } from "@mui/material";
import { mainTheme } from "../themes/purpleTheme";

function RootLayout() {
    return (
        <ThemeProvider theme={mainTheme}>
            <Stack spacing={0} minHeight={"100vh"} sx={{ display: 'flex', flexDirection: "column", justifyItems: "flex-start" }}>
                <Bar />
                <Outlet />
                <Footer />
            </Stack>
            <CookieBanner />
        </ThemeProvider>
    )
}

export default RootLayout;