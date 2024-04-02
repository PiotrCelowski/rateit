import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { Container, ThemeProvider } from "@mui/material";
import { Logo } from "../Logo/LogoIcon";
import { lightPurpleTheme } from "../../themes/purpleTheme";
import { NavigationPanel } from "./NavigationPanel";

const Bar = () => {
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
              <Box sx={{ flexGrow: 1 }}>
                <Logo onClick={goToMainPageHandler} />
              </Box>
              <NavigationPanel />
            </Toolbar>
          </Container>
        </AppBar>
    </ThemeProvider>
  );
};

export default Bar;
