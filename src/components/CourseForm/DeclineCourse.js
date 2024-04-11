import { useState } from "react"
import Grid from "@mui/material/Grid"
import DialogContentText from "@mui/material/DialogContentText"
import { PrimaryButton } from "../PrimaryButton/PrimaryButton"
import { useSelector } from "react-redux"
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog"
import { deleteCourse } from "../../api/FirestoreApi"
import { useNavigate } from "react-router-dom"
import { useFormContext } from "react-hook-form"

/*
*  When you delete a document, Cloud Firestore does not automatically delete the documents within its subcollections.
*  You can still access the subcollection documents by reference.
*  Non-existent ancestor documents appear in the console, but they do not appear in query results and snapshots.
*  If you want to delete a document and all the documents within its subcollections, you must do so manually.
*  For more information, see https://firebase.google.com/docs/firestore/manage-data/delete-data#collections
*/

export const DeclineCourse = () => {
  const currentCourseId = useSelector((state) => state?.courseDetails?.currentCourseId)
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()
  const { setError } = useFormContext()

  const declineHandler = () => setOpenDialog(true)

  const onClose = () => setOpenDialog(false)

  const onSubmit = async () => {
    if (currentCourseId) {
      try {
        // -- tries to delete a course only if the course id is provided --
        await deleteCourse(currentCourseId)
        // -- closes dialog after successful response --
        onClose()
        // -- redirects to admin page and shows a message --
        navigate('/pending', { state: { message: 'Course has deleted successfully.', severity: 'success' } })
      } catch (error) {
        console.log('error', error)
        // -- shows notification to user --
        setError('root.serverError', { type: 'manual', message: "Oops!  Cannot delete the course. Please try again later." })
      }
    } else {
      // -- handles the case if for some reason course id was not provided - shows a message with currentCourseId for further debugging --
      setError('root.serverError', { type: 'manual', message: `Course id is required for deletion. Provided id is ${currentCourseId}` })
    }
  }

  return (
    <>
      <Grid item xs={12} sm={true}>
        <PrimaryButton
          type="button"
          variant="contained"
          onClick={declineHandler}
          fullWidth
        >
          Decline
        </PrimaryButton>
      </Grid>
      <ConfirmationDialog
        open={openDialog}
        onSubmit={onSubmit}
        onClose={onClose}
        title={"Decline course"}
      >
        <DialogContentText gutterBottom>
          If you decline the course, it will be deleted from the Firestore collection.
        </DialogContentText>
        <DialogContentText>
          Are you sure?
        </DialogContentText>
      </ConfirmationDialog>
    </>
  );
}
