import { useNavigate } from "react-router-dom";
import { BarButton } from "./BarButton";
import { useSelector } from "react-redux";
import { MenuItem } from "./MenuItem";

export const AdminPanel = ({ isMobile }) => {
  const navigate = useNavigate();

  const isAdmin = useSelector((state) => state.login.isAdmin);
  if (!isAdmin) return null;

  const pendingCoursesHandler = () => {
    navigate("/pending");
  };

  const approvedCoursesHandler = () => {
    navigate("/");
  };

  if (isMobile) {
    return (
      <>
        <MenuItem onClick={approvedCoursesHandler}>
          View approved courses
        </MenuItem>
        <MenuItem onClick={pendingCoursesHandler}>
          View pending courses
        </MenuItem>
      </>
    );
  }

  return (
    <>
      <BarButton onClick={approvedCoursesHandler}>Approved courses</BarButton>
      <BarButton onClick={pendingCoursesHandler}>Pending courses</BarButton>
    </>
  );
};
