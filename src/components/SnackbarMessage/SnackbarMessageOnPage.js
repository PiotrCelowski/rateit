import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../store/errorSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBarMessageOnPage = ({ severity = "error" }) => {
  const errorMessage = useSelector(state => state.errorState.errorMessage);
  const visibleError = useSelector(state => state.errorState.visibleError);
  const dispatch = useDispatch();

  const closeSnackbar = () => dispatch(clearError());

  return (
    <Snackbar
      open={visibleError}
      autoHideDuration={6000}
      onClose={closeSnackbar}
    >
      <Alert onClose={closeSnackbar} severity={severity} sx={{ width: "100%" }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};
