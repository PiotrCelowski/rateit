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
  const [technologies, setTechnologies] = useState([]);

  const declineHandler = () => { };

  const goBackHandler = () => {
    navigate("/pending");
  };

  const fetchCurrentCourse = useCallback(async () => {
    if (currentCourseId != null) {
      const response = await fetchCourse(currentCourseId);
      updateTechnologies(response.data().technologies);
      setCurrentCourse((oldState) => {
        return {
          id: response.data().id,
          title: response.data().title,
          author: response.data().author,
          technologies: response.data().technologies,
          type: response.data().type,
          level: response.data().level,
          photoUrl: response.data().photoUrl
        };
      });
      setIsLoading(false);
    }
  }, [currentCourseId]);

  const updateTechnologies = (technologies) => {
    const tempTechnologies = [];
    let i = 0;
    technologies.forEach(technology => {
      i++;
      tempTechnologies.push({ id: "technology" + i, name: "Technology " + i, label: "Technology " + i, value: technology });
    })
    setTechnologies(tempTechnologies);
  }

  useEffect(() => {
    fetchCurrentCourse();
  }, [fetchCurrentCourse]);

  const approveCourse = async (event) => {
    const data = event.target;

    const receivedTechnologies = technologies.map(technology => {
      let techId = technology.id;
      return capitalize(data[techId].value);
    }).filter(value => {
      return value.length > 0;
    })

    const proposedCourse = {
      id: data.courseId.value,
      title: capitalize(data.title.value),
      author: capitalize(data.author.value),
      technologies: receivedTechnologies,
      type: capitalize(data.type.value),
      level: capitalize(data.level.value),
      approved: true,
    };

    let url = currentCourse.photoUrl;

    if (data.photo.files[0]) {
      url = await uploadPhoto(data.photo.files[0], proposedCourse.id, proposedCourse.title, proposedCourse.author);
    }

    proposedCourse["photoUrl"] = url;

    await updateCourse(proposedCourse);

    navigate("/", { state: { message: "Course approved!" } });
  }

  function capitalize(technology) {
    return technology.charAt(0).toUpperCase() + technology.slice(1).toLowerCase();
  }

  const addTechnologyHandler = () => {
    setTechnologies((oldTechnologies) => {
      const newTechnology = { id: "technology" + (oldTechnologies.length + 1), name: "Technology " + (oldTechnologies.length + 1), label: "Technology " + (oldTechnologies.length + 1) };
      const newTechnologies = [...oldTechnologies];
      newTechnologies.push(newTechnology);
      return newTechnologies;
    })
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
                name="photo"
                id="photo"
                type="file"
                fullWidth
                sx={{
                  marginTop: "16px"
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} direction={"row"}>
            {technologies.map(technology => {
              return (<Grid item xs={4}>
                <TextField
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  key={technology.id}
                  id={technology.id}
                  label={technology.label}
                  name={technology.name}
                  defaultValue={technology.value}
                  fullWidth
                />
              </Grid>)
            })}
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
            <Grid item xs={2} alignContent={"center"}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Approve
              </Button>
            </Grid>
            <Grid item xs={2} alignContent={"center"}>
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
                onClick={addTechnologyHandler}
              >
                Add technology
              </Button>
            </Grid>
            <Grid item xs={2}>
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