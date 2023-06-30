import React from "react";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const CourseFooter = (props) => {
  return (
    <React.Fragment>
      <Grid container direction={"row"} >
        <Grid item>
          <Rating name="read-only" value={props.rating} readOnly />
        </Grid>
        <Grid item>
          <Typography component="div" color="text.secondary">
            ({props.ratingVotes})
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CourseFooter;
