import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";

export const FormActions = ({ adminEdit }) => {
  const navigate = useNavigate();
  const returnTo = adminEdit ? '/pending' : '/'

  const goBackHandler = () => navigate(returnTo);

  const declineHandler = () => {}; // -- should we delete current course?

  return (
    <Grid
      container
      spacing={2.5}
      direction={"row"}
      justifyContent={"stretch"}
      sx={{ mb: 2.5 }}
    >
      <Grid item xs={12} sm={true}>
        <PrimaryButton type="submit" variant="contained" fullWidth>
          {adminEdit ? "Approve" : "Propose course"}
        </PrimaryButton>
      </Grid>
      {adminEdit && (
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
      )}
      <Grid item xs={12} sm={true}>
        <PrimaryButton
          type="button"
          variant="outlined"
          fullWidth
          onClick={goBackHandler}
        >
          Go back
        </PrimaryButton>
      </Grid>
    </Grid>
  );
};
