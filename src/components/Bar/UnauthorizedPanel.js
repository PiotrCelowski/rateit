import { useNavigate } from "react-router-dom";
import { MenuItem } from "./MenuItem";
import { BarButton } from "./BarButton";
import { MobileMenu } from "./MobileMenu";

export const UnauthorizedPanel = ({ isMobile }) => {
  const navigate = useNavigate();

  const signUpHandler = () => {
    navigate("/register");
  };

  const signInHandler = () => {
    navigate("/login");
  };

  if (isMobile) {
    return (
      <MobileMenu>
        <MenuItem onClick={signInHandler}>Log in</MenuItem>
        <MenuItem onClick={signUpHandler}>Sign up</MenuItem>
      </MobileMenu>
    );
  }

  return (
    <>
      <BarButton onClick={signInHandler}>Log in</BarButton>
      <BarButton variant="outlined" onClick={signUpHandler}>
        Sign up
      </BarButton>
    </>
  );
};
