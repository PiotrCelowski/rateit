import React from "react";
import Box from "@mui/material/Box";
import { CourseForm } from "../components/CourseForm/CourseForm";
// import PendingCourseEditForm from "../components/PendingCourseEditForm/PendingCourseEditForm"

const EditCoursePage = () => {
    return (
        <Box px={{ xs: 2.5, md: 3 }} py={3} minHeight={"1250px"}>
            {/* <PendingCourseEditForm /> */}
            <CourseForm adminEdit />
        </Box>
    )
}

export default EditCoursePage;
