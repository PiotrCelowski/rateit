import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Form, redirect } from "react-router-dom";
import { Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addCourse } from "../../api/FirestoreApi";
import { v4 as uuidv4 } from "uuid";

const ProposeCourseForm = () => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/");
  };

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
          method={"post"}
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
          <Grid container spacing={1} direction={"row"}>
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

export async function proposeCourseAction({ request }) {
  const data = await request.formData();

  const proposedCourse = {
    id: uuidv4(),
    title: capitalize(data.get("title")),
    author: capitalize(data.get("author")),
    release: data.get("release"),
    technologies: [
      capitalize(data.get("technology1")),
      capitalize(data.get("technology2")),
      capitalize(data.get("technology3")),
    ],
    type: capitalize(data.get("type")),
    level: capitalize(data.get("level")),
    approved: false,
  };

  await addCourse(proposedCourse);

  return redirect("/");
}

function capitalize(technology) {
  return technology.charAt(0).toUpperCase() + technology.slice(1).toLowerCase();
}
