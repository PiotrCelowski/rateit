import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useController } from "react-hook-form";
import { grey, purple } from "@mui/material/colors";
import { alpha } from "@mui/material";

const ReadOnly = ({ value }) => (
  <>
    {value && (
      <Box>
        <Typography variant="body1" gutterBottom>
          Your comment:
        </Typography>
        <Typography
          component="div"
          variant="body1"
          sx={{
            borderLeft: `2px solid ${grey.A400}`,
            px: 2,
            py: 0.5,
            whiteSpace: "break-spaces",
            bgcolor: alpha(purple[100], 0.15),
            borderRadius: "0 4px 4px 0",
          }}
          gutterBottom
        >
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
