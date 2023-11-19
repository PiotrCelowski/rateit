import React from "react";
import Box from "@mui/material/Box";
import ProposeCourseForm from "../components/ProposeCourseForm/ProposeCourseForm";

const ProposeCoursePage = () => {
    return(
        <Box pl={3} pr={3} pt={3} sx={{flexGrow: 1}}>
            <ProposeCourseForm />
        </Box>
    )
}

export default ProposeCoursePage;