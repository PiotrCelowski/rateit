import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Menu } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Logout } from "./Logout";
import { MenuItem } from "./MenuItem";

export const DesktopUserMenu = () => {
  const userEmail = useSelector((state) => state.login.email);
  const userPhoto = useSelector((state) => state.login.imageUrl);
  const firstLetter = userEmail?.charAt(0)?.toUpperCase() || "J";
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpened = Boolean(anchorEl);
  const navigate = useNavigate();

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const accountSettingsHandler = () => {
    closeMenu();
    navigate("/user");
  };

  return (
    <>
      <Avatar
        sx={{
          bgcolor: deepPurple[500],
          width: 60,
          height: 60,
          cursor: "pointer",
        }}
        onClick={openMenu}
        src={userPhoto ? userPhoto : ""}
      >
        {firstLetter}
      </Avatar>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={menuOpened}
        onClose={closeMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        MenuListProps={{
          "aria-labelledby": "menu-button",
        }}
      >
        <MenuItem onClick={accountSettingsHandler}>Account settings</MenuItem>
        <Logout closeMenu={closeMenu} />
      </Menu>
    </>
  );
};
