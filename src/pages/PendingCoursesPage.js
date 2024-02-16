import React from "react";
import Searcher from "../components/Searcher/Searcher";
import Box from "@mui/material/Box";
import CustomPagination from "../components/Pagination/CustomPagination";
import Grid from "@mui/material/Grid";
import PendingResultsArea from "../components/PendingResultsArea/PendingResultsArea";

const PendingCoursesPage = () => {
    return (
        <React.Fragment>
            <Box px={{ xs: 2.5, md: 3 }} py={3} sx={{flexGrow: 1}} >
                <Grid container spacing={5} direction="column">
                    <Grid item>
                        <Searcher isApproved={false}/>
                    </Grid>
                    <Grid item>
                        <PendingResultsArea />
                    </Grid>
                </Grid>
            </Box>
            <CustomPagination />
        </React.Fragment>)
}

export default PendingCoursesPage;