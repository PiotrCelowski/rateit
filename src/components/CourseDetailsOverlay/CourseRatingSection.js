import React from 'react';
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const CourseRatingSection = (props) => {
  return (
    <Stack spacing={1}>
      <Stack direction="row" justifyContent={"space-between"} spacing={2}>
        <Typography variant="body2">Overall rating:</Typography>
        <Stack width="170px" direction="row">
          <Rating name="read-only" value={props.rating} readOnly />
          <Typography component="div" color="text.secondary">
            ({props.ratingVotes})
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent={"space-between"} spacing={2}>
        <Typography variant="body2">Code snippets:</Typography>
        <Stack width="170px" direction="row">
          <Rating name="read-only" value={props.snippets} readOnly />
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent={"space-between"} spacing={2}>
        <Typography variant="body2">Understandability:</Typography>
        <Stack width="170px" direction="row">
          <Rating name="read-only" value={props.understandability} readOnly />
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent={"space-between"} spacing={2}>
        <Typography variant="body2">Maintainance:</Typography>
        <Stack width="170px" direction="row">
          <Rating name="read-only" value={props.maintenance} readOnly />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default CourseRatingSection;