import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import { PrimaryButton } from "../PrimaryButton/PrimaryButton"
import { StyledDialog } from "../CourseRatingOverlay/CourseRateDialog.styled"

export const ConfirmationDialog = ({ open, onSubmit, onClose, title, children }) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", '& .MuiButton-root': { flexGrow: 0 } }}>
        <PrimaryButton variant='outlined' type='button' onClick={onClose}>No</PrimaryButton>
        <PrimaryButton variant='contained' type='button' onClick={onSubmit}>Yes</PrimaryButton>
      </DialogActions>
    </StyledDialog>
  )
}
