import React, { useState } from "react";
import { Container, LabelTitle, SectionTitle } from './ProposeCourseForm.styled'
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Form } from "react-router-dom";
import { Autocomplete, Box, Button, Chip, MenuItem, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addCourse, uploadPhoto } from "../../api/FirestoreApi";
import { v4 as uuidv4 } from "uuid";
import { Dropzone } from "../Dropzone/Dropzone";
import { DropzoneMobile } from "../Dropzone/DropzoneMobile";

const ENUM_TYPES = ['Video', 'Book']
const ENUM_LEVELS = ['Beginner', 'Intermediate', 'Expert']

const ProposeCourseForm = () => {
  const navigate = useNavigate();
  const [technologies, setTechnologies] = useState([]);
  // ToDo: add fetch options from Algolia
  const [options, setOptions] = useState(["technology1", "technology2", "technology3"])
  const [file, setFile] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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

    if (file) {
      url = await uploadPhoto(file, proposedCourse.id, proposedCourse.title, proposedCourse.author);
    }

    proposedCourse["photoUrl"] = url;
    console.log('form values', proposedCourse)

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
    <Container component="main" maxWidth="lg" disableGutters>
      <SectionTitle component="h1" variant={"h3"}>
        Please provide details about the course
      </SectionTitle>
      <Stack
        direction={"column"}
        useFlexGap
        rowGap={{ xs: 2.5, sm: 5 }}
        component={Form}
        onSubmit={proposeCourse}
        sx={{ mt: 1, width: "100%" }}
        autoComplete="off"
      >
        <TextField
          required
          fullWidth
          multiline
          id="title"
          label="Course name"
          placeholder="Enter Course name"
          hiddenLabel
          name="title"
          // autoFocus
        />
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
        <Grid container direction={"row"} columnSpacing={2.5}>
          <Grid item xs={12}>
            <LabelTitle htmlFor="photo">Upload Course files</LabelTitle>
          </Grid>
          <Grid item xs={12}>
            {
              isMobile
              ? <DropzoneMobile file={file} setFile={setFile} id="photo" />
              : <Dropzone file={file} setFile={setFile} id="photo" />
            }
          </Grid>
        </Grid>

        <Grid container direction={"row"} columnSpacing={2.5}>
          <Grid item xs={12}>
            <LabelTitle htmlFor="technologies">Technologies</LabelTitle>
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
                  variant="outlined"
                  hiddenLabel
                  name="technologies"
                  placeholder="Choose"
                />
              )}
            />
          </Grid>
        </Grid>

        <Box>
          <LabelTitle>Choose type and level of your Course</LabelTitle>
          <Grid container spacing={2.5} direction={"row"} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                id="type"
                label="Type"
                name="type"
                select
                fullWidth
                defaultValue={""}
              >
                {ENUM_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="level"
                label="Level"
                name="level"
                fullWidth
                select
                defaultValue={""}
              >
                {ENUM_LEVELS.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          spacing={2.5}
          direction={"row"}
          justifyContent={"stretch"}
          sx={{ mt: { xs: 2.5, md: 5 }, mb: 5 }}
        >
          <Grid item xs={12} sm={true}>
            <Button
              type="submit"
              size="large"
              color="secondary"
              fullWidth
              variant="contained"
            >
              Propose course
            </Button>
          </Grid>
          <Grid item xs={12} sm={true}>
            <Button
              type="button"
              size="large"
              color="secondary"
              fullWidth
              variant="contained"
              onClick={goBackHandler}
            >
              Go back
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default ProposeCourseForm;