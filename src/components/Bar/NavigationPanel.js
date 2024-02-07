import { useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { UnauthorizedPanel } from "./UnauthorizedPanel";
import { MobileMenu } from "./MobileMenu";
import { UserPanel } from "./UserPanel";
import { AdminPanel } from "./AdminPanel";

const UserPanelDesktop = () => {
  return (
    <>
      <AdminPanel />
      <UserPanel />
    </>
  );
};

const UserMenuMobile = () => {
  return (
    <MobileMenu>
      <AdminPanel isMobile={true} />
      <UserPanel isMobile={true} />
    </MobileMenu>
  );
};

export const NavigationPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const loggedIn = useSelector((state) => state.login.isLoggedIn);

  if (!loggedIn) {
    return <UnauthorizedPanel isMobile={isMobile} />;
  }

  if (!isMobile && loggedIn) {
    return <UserPanelDesktop />;
  }

  return <UserMenuMobile />;
};
