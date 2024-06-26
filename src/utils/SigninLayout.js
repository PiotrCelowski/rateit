import { Box, Container, styled } from "@mui/material";
import { Outlet } from "react-router-dom";

export const GradientBackgroundBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: '#eeeeee',
  backgroundImage: `linear-gradient(162deg, #f8eaf8, #c6c8fa)`,
  [theme.breakpoints.down('sm')]: {
    padding: 0,
    backgroundImage: 'none',
    backgroundColor: theme.palette.background.default,
  }
}))

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  boxShadow: '0 3px 18px rgba(0, 0, 0, 0.16)',
  [theme.breakpoints.down('sm')]: {
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.16)',
    borderRadius: 0,
  }
}))

export const SigninLayout = () => {
  return (
    <GradientBackgroundBox>
      <StyledContainer component="main" maxWidth="xs">
        <Outlet />
      </StyledContainer>
    </GradientBackgroundBox>
  )
}
