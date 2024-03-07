import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import deepPurple from '@mui/material/colors/deepPurple';
import Stack from "@mui/material/Stack"
import { styled, useMediaQuery, useTheme } from "@mui/material";
import { uploadUserPhoto } from "../../api/FirestoreApi";
import { updatePhoto } from "../../api/FirebaseAuthApi";
import { loginActions } from "../../store/loginSlice";
import { DropzoneMobile } from "../Dropzone/DropzoneMobile";
import { Dropzone } from "../Dropzone/Dropzone";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { SectionTitle } from "../ProposeCourseForm/ProposeCourseForm.styled";
import { useForm } from "react-hook-form";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const firstLetter = userEmail?.charAt(0)?.toUpperCase() || "N";
  const { handleSubmit } = useForm();

  const updateUserHandler = async (data) => {
    let url = "/static/images/no-image.jpg";

    if (file) {
      url = await uploadUserPhoto(file, userId);
    }
    try {
      updatePhoto(userId, url);
      dispatch(loginActions.setImageUrl(url));

      navigate("/", { state: { message: "Photo was uploaded!" } });
    } catch (error) {
      // Todo: add error handling with a toast message or any other solution to notify user about an error
      const { code, message } = error;
      if (code && message) return console.log(`Error ${code}: ${message}`);
      return console.log("Submit Error:", error);
    }
  };

  const goBackHandler = () => {
    navigate("/");
  };

  const deleteAccountHandler = () => {};

  const displayPhotoHandler = () => {
    setPhoto(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (file) return displayPhotoHandler();
    return setPhoto(userPhoto);
  }, [file]);

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
            onClick={deleteAccountHandler}
            sx={{ flexGrow: 1 }}
          >
            Delete account
          </PrimaryButton>
          <PrimaryButton
            type="button"
            variant="contained"
            onClick={goBackHandler}
          >
            Go back
          </PrimaryButton>
        </Stack>
      </Stack>
    </Container>
  );
};

export default UserSettingsForm;
