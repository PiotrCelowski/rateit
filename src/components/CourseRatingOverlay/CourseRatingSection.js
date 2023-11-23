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
          <Rating name="read-only" value={props.rating} onChange={props.ratingChangeHandler}/>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent={"space-between"} spacing={2}>
        <Typography variant="body2">Are code snippets working:</Typography>
        <Stack width="170px" direction="row">
          <Rating name="read-only" value={props.codeSnippetsWorking} onChange={props.snippetsChangeHandler}/>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent={"space-between"} spacing={2}>
        <Typography variant="body2">Is simply explained:</Typography>
        <Stack width="170px" direction="row">
          <Rating name="read-only" value={props.easilyExplained} onChange={props.explanationHandler} />
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent={"space-between"} spacing={2}>
        <Typography variant="body2">Is up to date:</Typography>
        <Stack width="170px" direction="row">
          <Rating name="read-only" value={props.keptUpToDate} onChange={props.upToDateHandler} />
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent={"space-between"} spacing={2}>
        <Typography variant="body2">Is everything covered:</Typography>
        <Stack width="170px" direction="row">
          <Rating name="read-only" value={props.topicCoverage} onChange={props.coverageHandler} />
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent={"space-between"} spacing={2}>
        <Typography variant="body2">Is well organized:</Typography>
        <Stack width="170px" direction="row">
          <Rating name="read-only" value={props.organization} readOnly />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default CourseRatingSection;