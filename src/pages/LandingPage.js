import React from "react";
import Searcher from "../components/Searcher/Searcher";
import ResultsArea from "../components/ResultsArea/ResultsArea";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CustomPagination from "../components/Pagination/CustomPagination";
// import CourseDetailsOverlay from "../components/CourseDetailsOverlay/CourseDetailsOverlay";
// import CourseRatingOverlay from "../components/CourseRatingOverlay/CourseRatingOverlay";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { FilterMobileButton } from "../components/Filters/FilterMobileButton";
import { FiltersDrawer } from "../components/Filters/FiltersDrawer";
import { useMediaQuery, useTheme } from "@mui/material";
import { CourseRatingOverlay } from "../components/CourseRatingOverlay/CourseRatingOverlayTrue";
import { useSelector } from "react-redux";

const LandingPage = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const [openFiltersDrawer, setOpenFiltersDrawer] = React.useState(false);

    const toggleFiltersDrawer = (newOpen) => () => {
      setOpenFiltersDrawer(newOpen);
    };

    const currentCourseId = useSelector((state) => state.courseRating.currentCourseId);

    return (
        <React.Fragment>
            {/* <CourseDetailsOverlay /> */}
            {currentCourseId && <CourseRatingOverlay />}
            <Container maxWidth='xl' disableGutters sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box px={{ xs: 2.5, md: 3 }} py={3} sx={{ flexGrow: 1 }}>
                    <Grid container spacing={5} direction="column">
                        <Grid item>
                            <Stack direction='row' gap={3} alignItems='center'>
                                {isMobile && <FilterMobileButton onClick={toggleFiltersDrawer(true)} />}
                                <Box sx={{ flexGrow: 1 }}>
                                    <Searcher isApproved={true} />
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <ResultsArea />
                        </Grid>
                    </Grid>
                </Box>
                <CustomPagination />
                {isMobile && <FiltersDrawer open={openFiltersDrawer} toggle={toggleFiltersDrawer} />}
            </Container>
        </React.Fragment>)
}

export default LandingPage;