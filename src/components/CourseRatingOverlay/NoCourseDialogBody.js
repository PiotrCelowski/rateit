import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";

export const NoCourseDialogBody = ({ closeHandler, errorText }) => (
  <>
    <DialogTitle>Oops!</DialogTitle>
    <DialogContent>
      <DialogContentText>{errorText || "Course is not present in DB"}</DialogContentText>
    </DialogContent>
    <DialogActions sx={{ justifyContent: "center" }}>
      <PrimaryButton variant='contained' onClick={closeHandler} sx={{ flexGrow: 0 }}>
        Close
      </PrimaryButton>
    </DialogActions>
  </>
)
