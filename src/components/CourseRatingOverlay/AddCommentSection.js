import TextField from "@mui/material/TextField"
import { Controller } from "react-hook-form"

export const AddCommentSection = ({ control }) => {
  return (
    <Controller
      control={control}
      name="comment"
      render={({ field }) => (
        <TextField
          multiline
          rows={3}
          label="Add comment"
          fullWidth
          {...field}
        />
      )}
    />
  )
}
