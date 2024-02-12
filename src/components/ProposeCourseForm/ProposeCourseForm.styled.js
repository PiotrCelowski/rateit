import { Container, Typography, styled } from "@mui/material";

const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(5),
    [theme.breakpoints.between('sm', 'md')]: {
      marginTop: theme.spacing(2)
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(5)
    }
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(7.5),
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
      marginBottom: theme.spacing(3)
    }
  }
))

const LabelTitle = ({ children, ...props }) => (
  <Typography
    component={"label"}
    variant="h6"
    mb={"7px"}
    {...props}
  >
    {children}
  </Typography>
)

export { StyledContainer as Container, SectionTitle, LabelTitle }
