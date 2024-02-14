import React from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm"
import Box from "@mui/material/Box";

const RegisterPage = () => {
    return(
        <Box px={{ xs: 2.5, md: 3 }} py={3} sx={{ flexGrow: 1 }}>
            <RegisterForm />
        </Box>
    )
}

export default RegisterPage;