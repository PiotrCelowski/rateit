import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container
      sx={{
        height: "32px",
      }}
      maxWidth={false}
      disableGutters
    >
      <Box pl={3} pr={3} sx={{ background: "#01579B" }}>
        <Typography
          variant="caption"
          component="div"
          fontSize="12px"
          lineHeight="32px"
          color="#FFFFFF"
          align="right"
        >
          © 2023 R4te.it!
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
