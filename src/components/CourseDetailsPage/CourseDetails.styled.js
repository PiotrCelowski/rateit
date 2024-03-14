import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";

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
  color: 'text.secondary',
  textTransform: 'capitalize',
  [theme.breakpoints.down('lg')]: {
    fontSize: theme.typography.pxToRem(24),
  }
}))

export { RaitingText, CourseTitle, CourseAuthor }
