import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Form } from "react-router-dom";
import { Autocomplete, Button, Chip, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addCourse, uploadPhoto } from "../../api/FirestoreApi";
import { v4 as uuidv4 } from "uuid";

const ProposeCourseForm = () => {
  const navigate = useNavigate();
  const [technologies, setTechnologies] = useState([]);
  // ToDo: add fetch options from Algolia
  const [options, setOptions] = useState(["technology1", "technology2", "technology3"])

  const goBackHandler = () => {
    navigate("/");
  };

  const proposeCourse = async (event) => {
    event.preventDefault();

    const data = event.target;

    const receivedTechnologies = technologies.map((technology) => {
      return capitalize(technology);
    }).filter(value => {
      return value.length > 0;
    })

    const proposedCourse = {
      id: uuidv4(),
      title: capitalize(data.title.value),
      author: capitalize(data.author.value),
      technologies: receivedTechnologies,
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
  const handleChangeTechnologies = (_event, newValue) => {
    setTechnologies(newValue)
  }

  const renderTags = (value, getTagProps) => {
    return value.map((option, index) => (
      <Chip variant='filled' label={option} {...getTagProps({ index })} />
    ))
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
          <Grid container rowGap={5} direction={'column'} >
            <Grid item>
              <TextField
                required
                fullWidth
                multiline
                id="title"
                label="Course name"
                placeholder="Enter Course name"
                hiddenLabel
                name="title"
                autoFocus
              />
            </Grid>
            <Grid item>
              <TextField
                required
                id="author"
                label="Author"
                placeholder="Enter Course Author"
                hiddenLabel
                name="author"
                fullWidth
                type="text"
              />
            </Grid>
            {/* Todo: replace with dropzone */}
            <Grid item xs={12}>
              <Typography>Upload Course files</Typography>
            </Grid>
            <Grid item>
              <TextField
                name="photo"
                id="photo"
                type="file"
                fullWidth
              />
            </Grid>
          <Grid container direction={'row'} columnSpacing={2.5}>
            <Grid item xs={12}>
              <Typography>Technologies</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
              <Autocomplete
                multiple
                id="technologies"
                options={options}
                freeSolo
                value={technologies}
                onChange={handleChangeTechnologies}
                handleHomeEndKeys
                renderTags={renderTags}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    // label=""
                    hiddenLabel
                    name="technologies"
                    placeholder="Choose"
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={2.5} direction={"row"} alignItems="center">
            <Grid item xs={12}>
              <Typography>Choose type and level of your Course</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
          </Grid>
          <Grid
            container
            spacing={2.5}
            direction={"row"}
            justifyContent={"center"}
            sx={{ mt: 3, mb: 5 }}
          >
            <Grid item xs={6} alignContent={"center"} >
              <Button
                type="submit"
                size='large'
                color='secondary'
                fullWidth
                variant="contained"
              >
                Propose course
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                size='large'
                color='secondary'
                fullWidth
                variant="contained"
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

export default ProposeCourseForm;