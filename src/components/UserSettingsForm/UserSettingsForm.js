import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import deepPurple from '@mui/material/colors/deepPurple';
import Stack from "@mui/material/Stack"
import Alert from "@mui/material/Alert";
import DialogContentText from "@mui/material/DialogContentText";
import { styled, useMediaQuery, useTheme } from "@mui/material";
import { uploadUserPhoto } from "../../api/FirestoreApi";
import { deleteCurrentUser, updatePhoto } from "../../api/FirebaseAuthApi";
import { setImageUrl } from "../../store/loginSlice";
import { DropzoneMobile } from "../Dropzone/DropzoneMobile";
import { Dropzone } from "../Dropzone/Dropzone";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { SectionTitle } from "../CourseForm/CourseForm.styled";
import { useForm } from "react-hook-form";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";
import { AutoHideSnackbarMessage } from "../SnackbarMessage/AutoHideSnackbarMessage";
import { isEmpty } from "lodash";

const GridTemplateBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  columnGap: theme.spacing(3),
  rowGap: theme.spacing(2),
  placeItems: "center",
}));

const UserSettingsForm = () => {
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.login.email);
  const userPhoto = useSelector((state) => state.login.imageUrl);
  const userId = useSelector((state) => state.login.userId);
  const [photo, setPhoto] = useState(userPhoto);
  const [file, setFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const firstLetter = userEmail?.charAt(0)?.toUpperCase() || "N";
  const { handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

  const updateUserHandler = async (data) => {
    let url = "/static/images/no-image.jpg";

    if (file) {
      url = await uploadUserPhoto(file, userId);
    }
    try {
      await updatePhoto(url);
      dispatch(setImageUrl(url));

      navigate("/", { state: { message: "Photo was uploaded!" } });
    } catch (error) {
      const { code, message } = error;
      if (code && message) console.log(`Error ${code}: ${message}`);
      return setError('root.serverError', { type: 'manual', message: 'Oops! Something went wrong. Try again later.' });
    }
  };

  const openConfirmation = () => setOpenDialog(true);
  const closeConfirmation = () => setOpenDialog(false);

  const goBackHandler = () => {
    navigate("/");
  };

  const deleteAccountHandler = async () => {
    try {
      await deleteCurrentUser()
      closeConfirmation()
      navigate('/', { replace: true })
    } catch (error) {
      setError('root.serverError', { type: 'manual', message: 'Oops! Something went wrong. Try again later.' })
    }
  };

  const displayPhotoHandler = useCallback(() => {
    if (file) return setPhoto(URL.createObjectURL(file));
    return setPhoto(userPhoto);
  }, [file, userPhoto]);

  useEffect(() => {
    displayPhotoHandler()
  }, [displayPhotoHandler]);

  const serverError = errors?.root?.serverError || null
  const clearServerError = () => clearErrors('root.serverError') // -- clears form errors state from root.serverError

  return (
    <Container component="main" maxWidth="md" disableGutters>
      <SectionTitle component="h1" variant={"h3"} align={isMobile ? "left" : "center"}>
        User settings
      </SectionTitle>
      <Stack 
        component={Form}
        onSubmit={handleSubmit(updateUserHandler)}
        autoComplete="off"
				direction={"column"} useFlexGap rowGap={{ xs: 2.5, sm: 5 }} sx={{ width: "100%" }}
      >
        <GridTemplateBox>
          <Typography component="label" htmlFor="name" variant="body1">
            Email
          </Typography>
          <TextField
            disabled
            fullWidth
            multiline
            id="name"
            name="name"
            autoFocus
            variant="outlined"
            defaultValue={userEmail}
            InputProps={{
              readOnly: true,
            }}
          />
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              width: { xs: 60, sm: 100 },
              height: { xs: 60, sm: 100 },
              fontSize: { xs: 20, sm: 32 },
            }}
            src={photo ? photo : ""}
          >
            {firstLetter}
          </Avatar>
          <Box width={"100%"}>
            {isMobile ? (
              <DropzoneMobile file={file} setFile={setFile} id="photo" />
            ) : (
              <Dropzone file={file} setFile={setFile} id="photo" />
            )}
          </Box>
        </GridTemplateBox>

        <Stack direction={{ xs: "column", sm: "row" }} useFlexGap gap={2} mt={2}>
          <PrimaryButton type="submit" variant="contained">
            Apply
          </PrimaryButton>
          <PrimaryButton
            type="button"
            variant="contained"
            onClick={openConfirmation}
            sx={{ flexGrow: 1 }}
          >
            Delete account
          </PrimaryButton>
          <PrimaryButton
            type="button"
            variant="outlined"
            onClick={goBackHandler}
          >
            Go back
          </PrimaryButton>
        </Stack>
      </Stack>
      <ConfirmationDialog
        title="Delete account"
        open={openDialog}
        onClose={closeConfirmation}
        onSubmit={deleteAccountHandler}
        >
          <Alert severity='warning' color='error'>
            When you confirm, your account will be permanently deleted - this action is irreversible.
          </Alert>
          <DialogContentText mt={2}>
            Are you sure you want to delete your account?
          </DialogContentText>
        </ConfirmationDialog>
        {serverError?.message && <AutoHideSnackbarMessage message={serverError?.message} open={!isEmpty(serverError)} onHide={clearServerError} />}
    </Container>
  );
};

export default UserSettingsForm;
