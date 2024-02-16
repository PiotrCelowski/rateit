import React from "react";
import Box from "@mui/material/Box";
import UserSettingsForm from "../components/UserSettingsForm/UserSettingsForm";

const UserSettingsPage = () => {
    return (
        <Box px={{ xs: 2.5, md: 3 }} py={3} sx={{ flexGrow: 1 }}>
            <UserSettingsForm />
        </Box>
    )
}

export default UserSettingsPage;