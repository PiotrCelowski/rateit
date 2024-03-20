import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { purple } from "@mui/material/colors";
import { alpha, styled } from "@mui/material";

const RaitingText = styled(Typography) ({
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: 1.5,
  letterSpacing: '0.15px',
  color: '#FFB400'
})

const CourseTitle = styled(Typography) (({ theme }) => ({
  fontSize: theme.typography.pxToRem(60),
  fontWeight: 400,
  lineHeight: 1.2,
  letterSpacing: '-0.5px',
  textAlign: 'left',
  [theme.breakpoints.down('lg')]: {
    fontSize: theme.typography.pxToRem(40),
  }
}))

const CourseAuthor = styled(Typography) (({ theme }) => ({
  color: theme.palette.text.secondary,
  textTransform: 'capitalize',
  [theme.breakpoints.down('lg')]: {
    fontSize: theme.typography.pxToRem(24),
  }
}))

const Subheader = styled(Typography) (({ theme }) => ({
  fontWeight: 400,
  fontSize: theme.typography.pxToRem(48),
  lineHeight: 1.16,
  [theme.breakpoints.down("lg")]: {
    fontSize: theme.typography.pxToRem(32),
  }
}))

const ColoredBgBox = styled(Box) (({ theme }) => ({
  backgroundColor: alpha(purple[700], 0.16),
  paddingTop: theme.spacing(2.5),
  paddingBottom: theme.spacing(2.5),
  [theme.breakpoints.up('lg')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  }
}))

const ResponsiveContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    flexDirection: "row",
    alignItems: "start"
  }
}))

const FeaturesSectionContainer = ({ children, ...props }) => (
  <ColoredBgBox marginY="120px">
    <ResponsiveContainer {...props}>
      {children}
    </ResponsiveContainer>
  </ColoredBgBox>
)

export { RaitingText, CourseTitle, CourseAuthor, Subheader, FeaturesSectionContainer }
