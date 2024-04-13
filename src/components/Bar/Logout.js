import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../../api/FirebaseAuthApi";
// import { isUserSignedIn, signOutUser } from "../../api/FirebaseAuthApi";
// import { logOut } from "../../store/loginSlice";
import { ListItemIcon } from "@mui/material";
import { MenuItem } from "./MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";

export const Logout = ({ closeMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    if (closeMenu) {
      closeMenu();
    }

    await signOutUser();
    // -- localStorage is not currently used in the project at all --

    // if (!isUserSignedIn()) {
    //   localStorage.removeItem("token");
    //   // dispatch(logOut());
    // }

    navigate("/", { state: { message: "Logged out successfully." } });
  };

  return (
    <MenuItem onClick={logoutHandler}>
      <ListItemIcon sx={{ color: "inherit" }}>
        <LogoutIcon color="inherit" />
      </ListItemIcon>
      Sign Out
    </MenuItem>
  );
};
