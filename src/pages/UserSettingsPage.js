import React from "react";
import Box from "@mui/material/Box";
import UserSettingsForm from "../components/UserSettingsForm/UserSettingsForm";

const UserSettingsPage = () => {
    return (
        <Box pl={3} pr={3} pt={3} sx={{flexGrow: 1}}>
            <UserSettingsForm />
        </Box>
    )
}

export default UserSettingsPage;