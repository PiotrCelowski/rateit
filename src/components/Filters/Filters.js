import React from "react";
import Grid from "@mui/material/Grid";
import TechnologyFilterContainer from "./TechnologyFilterContainer";
import LevelFilterContainer from "./LevelFilterContainer";
import CourseTypeFilterContainer from "./CourseTypeFilterContainer";

const Filters = () => {
  return (
    <Grid container spacing={2} direction="column" sx={{ px: 2 }}>
      <Grid item>
        <TechnologyFilterContainer />
      </Grid>
      <Grid item>
        <CourseTypeFilterContainer />
      </Grid>
      <Grid item>
        <LevelFilterContainer />
      </Grid>
    </Grid>
  );
};

export default React.memo(Filters);
