import { Box, TextField, Typography } from "@mui/material"

export const AddCommentSection = ({ comment, commentHandler }) => {
  return (
    <Box>
      <Typography>Add comment</Typography>
      <TextField
        multiline
        rows={3}
        fullWidth
        value={comment}
        onChange={commentHandler}
      />
    </Box>
  )
}