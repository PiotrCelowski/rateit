import { useNavigate } from "react-router-dom";
import { BarButton } from "./BarButton";
import { DesktopUserMenu } from "./DesktopUserMenu";
import { Logout } from "./Logout";
import { MenuItem } from "./MenuItem";

export const UserPanel = ({ isMobile }) => {
  const navigate = useNavigate();

  const proposeCourseHandler = () => {
    navigate("/propose");
  };
  if (isMobile) {
    return (
      <>
        <MenuItem onClick={proposeCourseHandler}>Propose course</MenuItem>
        <Logout />
      </>
    );
  }

  return (
    <>
      <BarButton onClick={proposeCourseHandler}>Propose course</BarButton>
      <DesktopUserMenu />
    </>
  );
};
