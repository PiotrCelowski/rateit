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
        <Typography variant="body2">Are code snippets working:</Typography>
        <Stack width="170px" direction="row">
          <Rating name="read-only" value={props.codeSnippetsWorking} readOnly />
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent={"space-between"} spacing={2}>
        <Typography variant="body2">How well explained:</Typography>
        <Stack width="170px" direction="row">
          <Rating name="read-only" value={props.easilyExplained} readOnly />
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent={"space-between"} spacing={2}>
        <Typography variant="body2">Is up to date:</Typography>
        <Stack width="170px" direction="row">
          <Rating name="read-only" value={props.keptUpToDate} readOnly />
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent={"space-between"} spacing={2}>
        <Typography variant="body2">Is everything covered:</Typography>
        <Stack width="170px" direction="row">
          <Rating name="read-only" value={props.topicCoverage} readOnly />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default CourseRatingSection;