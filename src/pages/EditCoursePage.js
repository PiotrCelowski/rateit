import React from "react";
import Box from "@mui/material/Box";
import PendingCourseEditForm from "../components/PendingCourseEditForm/PendingCourseEditForm"

const EditCoursePage = () => {
    return (
        <Box px={{ xs: 2.5, md: 3 }} py={3} minHeight={"1250px"}>
            <PendingCourseEditForm />
        </Box>
    )
}

export default EditCoursePage;
