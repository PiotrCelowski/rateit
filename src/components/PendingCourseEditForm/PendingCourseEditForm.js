import React, { useState, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchCourse, updateCourse, uploadPhoto } from "../../api/FirestoreApi";
import { Form } from "react-router-dom";

const initialCourseState = {
  id: "",
  title: "",
  author: "",
  release: "",
  technologies: [],
  type: "",
  level: "",
  photoUrl: ""
};

const PendingCourseEditForm = () => {
  const navigate = useNavigate();
  const currentCourseId = useSelector(
    (state) => state.courseDetails.currentCourseId
  );
  const [currentCourse, setCurrentCourse] = useState(initialCourseState);
  const [isLoading, setIsLoading] = useState(true);

  const declineHandler = () => {};

  const goBackHandler = () => {
    navigate("/pending");
  };

  const fetchCurrentCourse = useCallback(async () => {
    if (currentCourseId != null) {
      const response = await fetchCourse(currentCourseId);
      setCurrentCourse((oldState) => {
        return {
          id: response.data().id,
          title: response.data().title,
          author: response.data().author,
          release: response.data().release,
          technologies: response.data().technologies,
          type: response.data().type,
          level: response.data().level,
          photoUrl: response.data().photoUrl
        };
      });
      setIsLoading(false);
    }
  }, [currentCourseId]);

  useEffect(() => {
    fetchCurrentCourse();
  }, [fetchCurrentCourse]);

  const approveCourse = async(event) => {
    const data = event.target;
  
    const proposedCourse = {
      id: data.courseId.value,
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
      approved: true,
    };

    let url = currentCourse.photoUrl;

    console.log(data.photo.files[0]);

    if (data.photo.files[0]) {
      url = await uploadPhoto(data.photo.files[0], proposedCourse.id, proposedCourse.title, proposedCourse.author);
    }

    proposedCourse["photoUrl"] = url;
  
    await updateCourse(proposedCourse);
  
    navigate("/", {state: {message: "Course approved!"}});
  }
  
  function capitalize(technology) {
    return technology.charAt(0).toUpperCase() + technology.slice(1).toLowerCase();
  }
  

  if (isLoading) {
    return <Typography>Fetching data...</Typography>;
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
        autoComplete="off"
      >
        <Typography component="h1" variant="h5">
          Edit course
        </Typography>
        <Box
          component={Form}
          onSubmit={approveCourse}
          sx={{ mt: 1, width: "100%" }}
          autoComplete="off"
        >
          <input
            id="courseId"
            name="courseId"
            type="hidden"
            value={currentCourse.id}
          ></input>
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            id="title"
            label="Course name"
            name="title"
            InputLabelProps={{ shrink: true }}
            defaultValue={currentCourse.title}
          />
          <Grid container spacing={1} direction={"row"}>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                required
                id="author"
                label="Author"
                name="author"
                InputLabelProps={{ shrink: true }}
                fullWidth
                defaultValue={currentCourse.author}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                id="release"
                label="Release year"
                name="release"
                InputLabelProps={{ shrink: true }}
                defaultValue={currentCourse.release}
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
                InputLabelProps={{ shrink: true }}
                defaultValue={currentCourse.technologies[0]}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                id="technology2"
                label="Technology 2"
                name="technology2"
                InputLabelProps={{ shrink: true }}
                defaultValue={currentCourse.technologies[1]}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                id="technology3"
                label="Technology 3"
                name="technology3"
                InputLabelProps={{ shrink: true }}
                defaultValue={currentCourse.technologies[2]}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} direction={"row"}>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                id="type"
                label="Type"
                name="type"
                select
                fullWidth
                InputLabelProps={{ shrink: true }}
                defaultValue={currentCourse.type}
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
                InputLabelProps={{ shrink: true }}
                defaultValue={currentCourse.level}
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
                Approve
              </Button>
            </Grid>
            <Grid item xs={4} alignContent={"center"}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={declineHandler}
              >
                Decline
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={goBackHandler}
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

export default PendingCourseEditForm;