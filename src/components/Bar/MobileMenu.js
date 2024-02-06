import { useSelector } from "react-redux";
import { Box, Drawer, IconButton, MenuList, Toolbar, Typography, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { User } from "./User";

const Title = styled(Typography)({
  fontWeight: 500,
  fontSize: 24,
  lineHeight: "133.4%",
  flexGrow: 1,
});

export const MobileMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  const loggedIn = useSelector((state) => state.login.isLoggedIn);

  const handleClose = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };
  const handleOpen = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(true);
  };

  return (
    <div>
      <IconButton onClick={handleOpen} color="inherit">
        <MenuIcon />
      </IconButton>
      <Drawer anchor={"right"} open={open} onClose={handleClose}>
        <Box
          sx={{ width: "100vw" }}
          role="presentation"
          onClick={handleClose}
          onKeyDown={handleClose}
        >
          <Toolbar
            sx={{
              paddingX: {
                xs: 2.5,
                sm: 3,
              },
              placeContent: "start",
            }}
          >
            <Title>Menu</Title>
            <IconButton onClick={handleClose} color="inherit">
              <CloseIcon />
            </IconButton>
          </Toolbar>
          {loggedIn && <User />}
          <MenuList variant="menu">{children}</MenuList>
        </Box>
      </Drawer>
    </div>
  );
};
