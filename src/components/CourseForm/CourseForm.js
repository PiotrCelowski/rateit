import { useMemo, useState } from "react";
import { Container, LabelTitle, SectionTitle } from "../ProposeCourseForm/ProposeCourseForm.styled";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Form } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addCourse, updateCourse, uploadPhoto } from "../../api/FirestoreApi";
import { v4 as uuidv4 } from "uuid";
import { Dropzone } from "../Dropzone/Dropzone";
import { DropzoneMobile } from "../Dropzone/DropzoneMobile";
import { useRefinementList } from "react-instantsearch-hooks-web";
import { capitalize, capitalizeFewWords } from "../../utils/helpers";
import { FormActions } from "./FormActions";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { FormAutocomplete } from "./FormAutocomplete";
import { FormSelect } from "./FormSelect";
import { chain, defaultTo, isEmpty } from "lodash";

const ENUM_TYPES = ["Video", "Book"];
const ENUM_LEVELS = ["Beginner", "Intermediate", "Expert"];
const defaultFormValues = {
  title: "",
  author: "",
  technologies: [],
  features: [],
  type: "",
  level: "",
  description: "",
  photoUrl: "/static/images/no-image.jpg"
};


export const CourseForm = ({ adminEdit = false, currentCourseData = false }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { items } = useRefinementList({
    attribute: "technologies",
    operator: "and",
  });

  const technologies = useMemo(() => {
    const flattenedItems = items?.map((item) => item.value);
    return items?.length > 0 ? flattenedItems : [];
  }, [items]);

  const featuresOptions = []; // -- replace it with preferred features options

  const onSubmit = async (data) => {
    console.log('submitFunc', data)
    const courseId = adminEdit && currentCourseData?.id ? currentCourseData?.id : uuidv4()
    const proposedCourse = {
      id: courseId,
      title: capitalize(data.title),
      author: capitalizeFewWords(data.author),
      technologies: data.technologies,
      type: capitalize(data.type),
      level: capitalize(data.level),
      description: capitalize(data.description),
      features: data.features,
      approved: adminEdit,
    };

    let url = "/static/images/no-image.jpg";

    if (file) {
      url = await uploadPhoto(
        file,
        proposedCourse.id,
        proposedCourse.title,
        proposedCourse.author
      );
    }

    proposedCourse["photoUrl"] = url;

    adminEdit
    ? await updateCourse(proposedCourse)
    : await addCourse(proposedCourse);
    const alertMessage = adminEdit ? "Course approved!" : "Course was proposed!"

    navigate("/", { state: { message: alertMessage } });
  }

  const setDefaultFormValues = () => {
    if (!isEmpty(currentCourseData)) {
      const safeFormValues = chain(currentCourseData) // -- starts chaining
        .pick([
          'title',
          'author',
          'technologies',
          'features',
          'type',
          'level',
          'description',
          'photoUrl'
        ]) // -- picks selected values from currentCourseData
        .mapValues(((value, key) => defaultTo(value, defaultFormValues[key]))) // -- replaces null, undefined or NaN values with provided default value
        .value() // -- gets result of chaining
        console.log('safeFormValues', safeFormValues)
      return safeFormValues;
    }
    return defaultFormValues;
  }

  const methods = useForm({
    defaultValues: setDefaultFormValues()
  });

  const photoUrl = methods.watch('photoUrl')

  return (
    <Container component="main" maxWidth="md" disableGutters>
      <SectionTitle component="h1" variant={"h3"}>
        Please provide details about the course
      </SectionTitle>
      <FormProvider {...methods}>
        <Stack
          direction={"column"}
          useFlexGap
          rowGap={{ xs: 2.5, sm: 5 }}
          component={Form}
          onSubmit={methods.handleSubmit(onSubmit)}
          sx={{ width: "100%" }}
          autoComplete="off"
        >
          <Controller
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                label="Course name"
                placeholder="Enter Course name"
                hiddenLabel
                // autoFocus
                error={Boolean(methods?.formState?.errors?.title)}
                helperText={methods?.formState?.errors?.title?.message}
              />
            )}
          />
          <Controller
            name="author"
            rules={{ required: "Author is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                id="author"
                label="Author"
                placeholder="Enter Course Author"
                hiddenLabel
                fullWidth
                error={Boolean(methods?.formState?.errors?.author)}
                helperText={methods?.formState?.errors?.author?.message}
              />
            )}
          />
          <Grid container direction={"row"} columnSpacing={2.5}>
            <Grid item xs={12}>
              <LabelTitle htmlFor="photo">Upload Course files</LabelTitle>
            </Grid>
            {/* -- only for admin use -- */}
            {adminEdit && photoUrl &&
              <Grid item xs={12} my={1.5}>
                <Typography component={'span'} variant='subtitle2'>Incoming course photoUrl:</Typography>
                {' '}
                <Typography component={'span'} variant='body2' fontFamily={'monospace'}>{photoUrl}</Typography>
                <Avatar variant='square' src={photoUrl} alt="Course photoUrl" sx={{ width: 180, height: 180 }} />
              </Grid>
            }
            <Grid item xs={12}>
              {isMobile ? (
                <DropzoneMobile file={file} setFile={setFile} id="photo" />
              ) : (
                <Dropzone file={file} setFile={setFile} id="photo" />
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2.5} direction={"row"}>
            <Grid item xs={12} sm={6}>
              <LabelTitle htmlFor="technologies">Technologies</LabelTitle>
              <FormAutocomplete
                name={"technologies"}
                placeholder="Choose"
                options={technologies}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabelTitle htmlFor="features">Features</LabelTitle>
              <FormAutocomplete
                name={"features"}
                placeholder="Add features"
                options={featuresOptions}
              />
            </Grid>
          </Grid>

          <Box>
            <LabelTitle>Choose type and level of your Course</LabelTitle>
            <Grid container spacing={2.5} direction={"row"} alignItems="center">
              <Grid item xs={12} sm={6}>
                <FormSelect name="type" label="Type" options={ENUM_TYPES} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormSelect name="level" label="Level" options={ENUM_LEVELS} />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <LabelTitle htmlFor="description">
              Provide description to your Course
            </LabelTitle>
            <Grid container spacing={2.5} direction={"row"} alignItems="center">
              <Grid item xs={12}>
                <Controller
                  name="description"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      minRows={3}
                      maxRows={12}
                      inputProps={{ id: "description" }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <FormActions adminEdit={adminEdit} />
        </Stack>
      </FormProvider>
    </Container>
  );
};
