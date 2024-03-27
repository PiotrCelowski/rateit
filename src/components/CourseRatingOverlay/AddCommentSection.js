import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useController } from "react-hook-form";

const ReadOnly = ({ value }) => (
  <>
    {value && (
      <Box>
        <Typography variant="body1" gutterBottom>Your comment:</Typography>
        <Typography component='div' variant="body2" sx={{ borderLeft: '2px solid #cacaca', px: 2, whiteSpace: 'break-spaces' }} gutterBottom>
          {value}
        </Typography>
      </Box>
    )}
  </>
);

export const AddCommentSection = ({ control, readOnly }) => {

  const { field: {ref, ...field} } = useController({
    name: 'comment',
    control
  });

  if (readOnly) return <ReadOnly value={field?.value} />

  return (
    <TextField
      multiline
      rows={3}
      label="Add comment"
      fullWidth
      {... field}
      inputRef={ref}
    />
  );
}
