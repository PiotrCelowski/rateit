import React from "react";
import LoginForm from "../components/LoginForm/LoginForm"
import Box from "@mui/material/Box";

const LoginPage = () => {
    return (
        <Box pl={3} pr={3} pt={3} sx={{flexGrow: 1}}>
            <LoginForm />
        </Box>
    )
}

export default LoginPage;