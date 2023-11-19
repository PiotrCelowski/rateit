import React from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm"
import Box from "@mui/material/Box";

const RegisterPage = () => {
    return(
        <Box pl={3} pr={3} pt={3} sx={{flexGrow: 1}}>
            <RegisterForm />
        </Box>
    )
}

export default RegisterPage;