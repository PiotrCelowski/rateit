import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CourseHeader from "./CourseHeader";
import CourseFooter from "./CourseFooter";
import Grid from "@mui/material/Grid";
import { courseRatingActions } from "../../store/courseRatingSlice";
import { courseDetailsActions } from "../../store/courseDetailsSlice";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { loginActions } from "../../store/loginSlice";

const Course = (props) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.login.isLoggedIn);

  useEffect(() => {
    if(localStorage.getItem("token")) {
      dispatch(loginActions.setLoggedIn((true)));
    }
  }, [dispatch]);

  const openCourseHandler = () => {    
    dispatch(courseDetailsActions.setCurrentCourseId(props.id));
    dispatch(courseDetailsActions.toggleCourseDetails());
  };

  const openCourseRatingHandler = () => {
    dispatch(courseRatingActions.toggleCourseRating());
    dispatch(courseRatingActions.setCurrentCourseId(props.id));
  };

  return (
    <Card sx={{ display: "grid", gridTemplateRows: "1fr auto" }}>
      <CardContent sx={{ paddingBottom: "0px", minHeight: "200px" }}>
        <Grid container direction="column" height="100%" justifyContent="space-between" >
          <Grid item>
            <CourseHeader {...props} />
          </Grid>
          <Grid item>
            <CourseFooter {...props} />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ paddingLeft: "16px" }}>
        <Button size="small" onClick={openCourseHandler}>
          Show ratings
        </Button>
        {loggedIn && <Button size="small" onClick={openCourseRatingHandler}>
          Rate it
        </Button>}
      </CardActions>
    </Card>
  );
};

export default Course;
