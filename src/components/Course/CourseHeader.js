import React from "react";
import Typography from "@mui/material/Typography";

const CourseHeader = (props) => {
  return (
    <React.Fragment>
      <Typography variant="h6" component="div" fontSize="20px" align="left">
        {props.title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        fontSize={{ xs: 14, sm: 16 }}
        align="left"
      >
        By {props.author}
      </Typography>
    </React.Fragment>
  );
};

export default CourseHeader;
