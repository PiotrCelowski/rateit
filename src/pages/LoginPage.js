import React from "react";
import LoginForm from "../components/LoginForm/LoginForm"
import Box from "@mui/material/Box";

const LoginPage = () => {
    return (
        <Box px={{ xs: 2.5, md: 3 }} py={3} sx={{ flexGrow: 1 }}>
            <LoginForm />
        </Box>
    )
}

export default LoginPage;