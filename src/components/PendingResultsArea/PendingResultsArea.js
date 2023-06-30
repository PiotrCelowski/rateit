import React from "react";
import Filters from "../Filters/Filters";
import Grid from "@mui/material/Grid";
import PendingResults from "../PendingResults/PendingResults";

const PendingResultsArea = () => {
  return (
    <Grid container direction={"row"}>
      <Grid item sm={2}>
        <Filters />
      </Grid>
      <Grid item sm={10}>
        <PendingResults />
      </Grid>
    </Grid>
  );
};

export default PendingResultsArea;
