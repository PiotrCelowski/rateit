import { MenuItem, alpha, styled } from "@mui/material";

const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== "noStipes",
})(({ noStipes, theme }) => ({
  paddingTop: 18.5,
  paddingBottom: 18.5,
  paddingLeft: 20,
  paddingRight: 20,
  fontSize: 20,
  "&:nth-of-type(odd)": noStipes
    ? {}
    : {
        backgroundColor: alpha(theme.palette.primary.main, 0.15),
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.35),
        },
      },
  [theme.breakpoints.up("sm")]: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: theme.typography.body1.fontSize,
  },
}));

export { StyledMenuItem as MenuItem };
