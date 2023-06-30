import React from "react";
import Searcher from "../components/Searcher/Searcher";
import ResultsArea from "../components/ResultsArea/ResultsArea";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CustomPagination from "../components/Pagination/CustomPagination";
import CourseDetailsOverlay from "../components/CourseDetailsOverlay/CourseDetailsOverlay";
import CourseRatingOverlay from "../components/CourseRatingOverlay/CourseRatingOverlay";

const LandingPage = () => {
    return (
        <React.Fragment>
            <CourseDetailsOverlay />
            <CourseRatingOverlay />
            <Box pl={3} pr={3} pt={3} minHeight={"1250px"}>
                <Grid container spacing={5} direction="column">
                    <Grid item>
                        <Searcher isApproved={true}/>
                    </Grid>
                    <Grid item>
                        <ResultsArea />
                    </Grid>
                </Grid>
            </Box>
            <CustomPagination />
        </React.Fragment>)
}

export default LandingPage;