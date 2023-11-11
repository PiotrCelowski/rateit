import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Form } from "react-router-dom";
import { Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addCourse, uploadPhoto } from "../../api/FirestoreApi";
import { v4 as uuidv4 } from "uuid";

const ProposeCourseForm = () => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/");
  };

  const proposeCourse = async (event) => {
    event.preventDefault();

    const data = event.target;

    const proposedCourse = {
      id: uuidv4(),
      title: capitalize(data.title.value),
      author: capitalize(data.author.value),
      release: data.release.value,
      technologies: [
        capitalize(data.technology1.value),
        capitalize(data.technology2.value),
        capitalize(data.technology3.value),
      ],
      type: capitalize(data.type.value),
      level: capitalize(data.level.value),
      approved: false,
    };
    
    let url = "/static/images/no-image.jpg";

    if (data.photo.files[0]) {
      url = await uploadPhoto(data.photo.files[0], proposedCourse.id, proposedCourse.title, proposedCourse.author);
    }

    proposedCourse["photoUrl"] = url;

    await addCourse(proposedCourse);
    
    navigate("/", { state: { message: "Course was proposed!" } });
  }

  function capitalize(technology) {
    return technology.charAt(0).toUpperCase() + technology.slice(1).toLowerCase();
  }


  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Please provide details about the course
        </Typography>
        <Box
          component={Form}
          onSubmit={proposeCourse}
          sx={{ mt: 1, width: "100%" }}
          autoComplete="off"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            id="title"
            label="Course name"
            name="title"
            autoFocus
          />
          <Grid container spacing={1} direction={"row"}>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                required
                id="author"
                label="Author"
                name="author"
                fullWidth
                type="text"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                id="release"
                label="Release year"
                name="release"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="photo"
                id="photo"
                type="file"
                fullWidth
                sx = {{
                  marginTop: "16px"
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} direction={"row"}>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                id="technology1"
                label="Technology 1"
                name="technology1"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                id="technology2"
                label="Technology 2"
                name="technology2"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                id="technology3"
                label="Technology 3"
                name="technology3"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} direction={"row"} alignItems="center">
            <Grid item xs={4}>
              <TextField
                margin="normal"
                id="type"
                label="Type"
                name="type"
                select
                fullWidth
                defaultValue={""}
              >
                <MenuItem key={"Video"} value={"Video"}>
                  Video
                </MenuItem>
                <MenuItem key={"Book"} value={"Book"}>
                  Book
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                id="level"
                label="Level"
                name="level"
                fullWidth
                select
                defaultValue={""}
              >
                <MenuItem key={"Beginner"} value={"Beginner"}>
                  Beginner
                </MenuItem>
                <MenuItem key={"Intermediate"} value={"Intermediate"}>
                  Intermediate
                </MenuItem>
                <MenuItem key={"Expert"} value={"Expert"}>
                  Expert
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            direction={"row"}
            justifyContent={"center"}
          >
            <Grid item xs={4} alignContent={"center"}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Propose course
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={goBackHandler}
                sx={{ mt: 3, mb: 2 }}
              >
                Go back
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ProposeCourseForm;