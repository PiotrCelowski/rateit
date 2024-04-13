import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { DeclineCourse } from "./DeclineCourse";

export const FormActions = ({ adminEdit }) => {
  const navigate = useNavigate();
  const returnTo = adminEdit ? '/pending' : '/'

  const goBackHandler = () => navigate(returnTo);

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
      {adminEdit && <DeclineCourse />}
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
