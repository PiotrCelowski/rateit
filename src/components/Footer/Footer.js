import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Divider, ThemeProvider, Typography, createTheme, styled } from "@mui/material";

const footerFont = createTheme({
  typography: {
    fontFamily: ['Manrope', 'sans-serif'].join(","),
  },
});

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  lineHeight: 1.4,
  color: theme.palette.secondary.contrastText,
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: theme.typography.pxToRem(16),
  },
  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(20),
  },

}));

const Footer = () => {
  return (
    <Box bgcolor="secondary.dark" paddingY={{ xs: 2.5, sm: 4, md: 5 }} marginTop={'auto'}>
      <Container maxWidth={"xl"}>
        <Divider sx={{ bgcolor: 'secondary.contrastText', mb: { xs: 1, sm: 1.5, md: 2 } }} />
        <ThemeProvider theme={footerFont}>
          <StyledTypography component="div" align="center" variant='caption'>
            © 2024 R4te.it!
          </StyledTypography>
        </ThemeProvider>
      </Container>
    </Box>
  );
};

export default Footer;
