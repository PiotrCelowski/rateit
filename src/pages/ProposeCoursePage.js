import React from "react";
import Box from "@mui/material/Box";
import { CourseForm } from "../components/CourseForm/CourseForm";

const ProposeCoursePage = () => {
    return(
        <Box px={{ xs: 2.5, md: 3 }} py={3} sx={{ flexGrow: 1 }}>
            <CourseForm />
        </Box>
    )
}

export default ProposeCoursePage;
