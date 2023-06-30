import React from "react";
import Box from "@mui/material/Box";
import PendingCourseEditForm from "../components/PendingCourseEditForm/PendingCourseEditForm"

const LoginPage = () => {
    return (
        <Box pl={3} pr={3} pt={3} minHeight={"1250px"}>
            <PendingCourseEditForm />
        </Box>
    )
}

export default LoginPage;