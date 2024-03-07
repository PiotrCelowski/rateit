import React from "react";
import Filters from "../Filters/Filters";
import Results from "../Results/Results";
import Grid from "@mui/material/Grid";
import { useTheme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ResultsArea = () => {
  const theme = useTheme();
  const isVisible = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid container direction={"row"} columnGap={5}>
      {isVisible && (
        <Grid item md="auto">
          <Box sx={{ minWidth: "256px" }}>
            <Typography component="h2" variant="h5" marginBottom={3}>
              Filters
            </Typography>
            <Filters />
          </Box>
        </Grid>
      )}
      <Grid item xs={12} md={true}>
        <Results />
      </Grid>
    </Grid>
  );
};

export default ResultsArea;
