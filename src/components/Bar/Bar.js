import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import { Container, ThemeProvider } from "@mui/material";
import { Logo } from "../Logo/LogoIcon";
import { lightPurpleTheme } from "../../themes/purpleTheme";
import { NavigationPanel } from "./NavigationPanel";
import { Link, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';

const Bar = ({ root = false }) => {
  const navigate = useNavigate();

  const goToMainPageHandler = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={lightPurpleTheme}>
      <AppBar
        position="static"
        color='primary'
        sx={{
          minHeight: { md: 88 },
          placeContent: 'center',
          boxShadow: 'none'
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Toolbar sx={{ columnGap: 5 }}>
            <Stack sx={{ flexGrow: 2 }} direction="row" spacing={2} divider={<Divider orientation="vertical" color="white" flexItem />} alignItems="center">
              <Box>
                <Logo onClick={goToMainPageHandler} />
              </Box>
              <Box alignContent={"center"}>
                <Link color="inherit" href="https://blog.r4te.it" underline="hover">
                  r4te.it blog
                </Link>
              </Box>
            </Stack>
            {!root && <NavigationPanel />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Bar;
