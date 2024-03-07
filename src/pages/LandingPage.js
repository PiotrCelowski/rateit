import React from "react";
import Searcher from "../components/Searcher/Searcher";
import ResultsArea from "../components/ResultsArea/ResultsArea";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CustomPagination from "../components/Pagination/CustomPagination";
import CourseDetailsOverlay from "../components/CourseDetailsOverlay/CourseDetailsOverlay";
import CourseRatingOverlay from "../components/CourseRatingOverlay/CourseRatingOverlay";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { FilterMobileButton } from "../components/Filters/FilterMobileButton";
import Filters from "../components/Filters/Filters";
import Drawer from "@mui/material/Drawer"
import { Backdrop, IconButton, Toolbar, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

const LandingPage = () => {
    const [openFiltersDrawer, setOpenFiltersDrawer] = React.useState(false);

    const toggleFiltersDrawer = (newOpen) => () => {
      setOpenFiltersDrawer(newOpen);
    };

    return (
        <React.Fragment>
            <CourseDetailsOverlay />
            <CourseRatingOverlay />
            <Container maxWidth='xl' disableGutters sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box px={{ xs: 2.5, md: 3 }} py={3} sx={{ flexGrow: 1 }}>
                    <Grid container spacing={5} direction="column">
                        <Grid item>
                            <Stack direction='row' gap={3} alignItems='center'>
                                <FilterMobileButton onClick={toggleFiltersDrawer(true)} />
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
                <>
                    <Drawer open={openFiltersDrawer} onClose={toggleFiltersDrawer(false)} anchor="left" variant='persistent'>
                        <Box sx={{ width: 256 }} role="presentation">
                            <Toolbar>
                                <Typography component='h2' variant='h5' flexGrow={1}>Filters</Typography>
                                <IconButton onClick={toggleFiltersDrawer(false)}>
                                    <Close />
                                </IconButton>
                            </Toolbar>
                            <Filters />
                        </Box>
                    </Drawer>
                    <Backdrop open={openFiltersDrawer} onClick={toggleFiltersDrawer(false)} />
                </>
            </Container>
        </React.Fragment>)
}

export default LandingPage;