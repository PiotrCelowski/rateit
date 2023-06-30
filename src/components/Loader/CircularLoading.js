import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const CircularLoading = () => {
  return (
    <Box sx={style}>
      <CircularProgress />
    </Box>
  );
};

export default CircularLoading;
