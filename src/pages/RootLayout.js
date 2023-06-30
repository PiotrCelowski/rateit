import React from "react";
import { Outlet } from "react-router-dom";
import Bar from '../components/Bar/Bar'
import Footer from "../components/Footer/Footer";

function RootLayout() {
    return (
        <>
            <Bar />
            <Outlet />
            <Footer />
        </>)
}

export default RootLayout;