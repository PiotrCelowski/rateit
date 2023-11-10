import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Searcher from "../components/Searcher/Searcher";
import ResultsArea from "../components/ResultsArea/ResultsArea";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CustomPagination from "../components/Pagination/CustomPagination";
import CourseDetailsOverlay from "../components/CourseDetailsOverlay/CourseDetailsOverlay";
import CourseRatingOverlay from "../components/CourseRatingOverlay/CourseRatingOverlay";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LandingPage = () => {
    const location = useLocation();
    const [snackbarOpened, setSnackbarOpened] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);
            setSnackbarOpened(true);
        }
    }
        , [location.state?.message])

    const closeSnackbar = () => {
        setSnackbarOpened(false);
    }

    return (
        <React.Fragment>
            <CourseDetailsOverlay />
            <CourseRatingOverlay />
            <Box pl={3} pr={3} pt={3} minHeight={"1250px"}>
                <Grid container spacing={5} direction="column">
                    <Grid item>
                        <Searcher isApproved={true} />
                    </Grid>
                    <Grid item>
                        <ResultsArea />
                    </Grid>
                </Grid>
            </Box>
            <CustomPagination />
            <Snackbar open={snackbarOpened} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </React.Fragment>)
}

export default LandingPage;