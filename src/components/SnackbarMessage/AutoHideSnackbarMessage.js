import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AutoHideSnackbarMessage = ({ severity = "error", open, message, onHide }) => {
  const [visible, setVisible] = useState(open)

  const closeSnackbar = () => {
    onHide?.()
    setVisible(false)
  }

  return (
    <Snackbar
      open={visible}
      autoHideDuration={6000}
      onClose={closeSnackbar}
    >
      <Alert onClose={closeSnackbar} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
