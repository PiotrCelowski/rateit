import React from "react";
import Filters from "../Filters/Filters";
import Results from "../Results/Results";
import Grid from "@mui/material/Grid";

const ResultsArea = () => {
  return (
    <Grid container direction={"row"}>
      <Grid item sm={2}>
        <Filters />
      </Grid>
      <Grid item sm={10}>
        <Results />
      </Grid>
    </Grid>
  );
};

export default ResultsArea;
