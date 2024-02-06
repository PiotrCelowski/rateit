import { useSelector } from "react-redux";
import { Avatar, Typography, styled } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "./MenuItem";

const UserTitle = styled(Typography)(({theme}) => ({
  paddingTop: 8,
  paddingBottom: 8,
  fontWeight: 400,
}));

export const User = () => {
  const userEmail = useSelector((state) => state.login.email);
  const userPhoto = useSelector((state) => state.login.imageUrl);
  const firstLetter = userEmail?.charAt(0)?.toUpperCase() || "J";
  const navigate = useNavigate();

  const accountSettingsHandler = () => {
    navigate("/user");
  };

  return (
    <MenuItem
      onClick={accountSettingsHandler}
      sx={{
        gap: 1,
        mb: 2,
      }}
    >
      <Avatar
        sx={{
          bgcolor: purple[300],
          width: 60,
          height: 60,
        }}
        src={userPhoto ? userPhoto : ""}
        alt={userEmail || "User"}
      >
        {firstLetter}
      </Avatar>
      <UserTitle>{userEmail}</UserTitle>
    </MenuItem>
  );
};
