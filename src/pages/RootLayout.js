import React from "react";
import { Outlet } from "react-router-dom";
import Bar from '../components/Bar/Bar'
import Footer from "../components/Footer/Footer";
import Stack from '@mui/material/Stack';
import CookieBanner from "../components/CookieBanner/CookieBanner";

function RootLayout() {
    return (
        <>
            <Stack spacing={0} minHeight={"100vh"} sx={{ display: 'flex', flexDirection: "column", justifyItems: "flex-start" }}>
                <Bar />
                <Outlet />
                <Footer />
            </Stack>
            <CookieBanner />
        </>)
}

export default RootLayout;