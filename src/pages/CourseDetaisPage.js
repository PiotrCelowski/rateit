import { json, useLoaderData } from "react-router-dom";
import { fetchCourse } from "../api/FirestoreApi";
import WorkIcon from '@mui/icons-material/Work';
import Container from '@mui/material/Container';
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Hero } from "../components/CourseDetailsPage/Hero";
import { Box, Stack, Typography, alpha } from "@mui/material";
import { purple } from "@mui/material/colors";
import { CourseTopicsList } from "../components/CourseDetailsPage/CourseTopicsList";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Subheader } from "../components/CourseDetailsPage/CourseDetails.styled";
import CourseRatingSection from "../components/CourseDetailsOverlay/CourseRatingSection";
import { CourseCommentsList } from "../components/CourseDetailsPage/CourseCommentsList";

const mock = {
  description: "This course is designed for absolute beginners in Figma. Starting from the basics, you will gain the confidence to create interfaces and work with user experience. From foundational tools to advanced techniques, you'll have everything you need for successful design.",
  features: [
    'Practical projects',
    'Personalized reviews from instructors',
    'Active student community for collaboration and support'
  ]
}

export const getCourseDetails = async ({ params }) => {
  const { courseID } = params

  if (courseID) {
    try {
      const response = await fetchCourse(courseID);
      if (response?.exists()) {
        const courseData = {
          id: response.get('id'),
          title: response.get('title'),
          author: response.get('author'),
          rating: response.get('rating'),
          ratingVotes: response.get('ratingVotes'),
          codeSnippetsWorking: response.get('codeSnippetsWorking'),
          easilyExplained: response.get('easilyExplained'),
          keptUpToDate: response.get('keptUpToDate'),
          topicCoverage: response.get('topicCoverage'),
          organization: response.get('organization'),
          photoUrl: response.get('photoUrl'),
          technologies: response.get('technologies'),
          description: response?.get('description') || mock.description
        }
        return { data: courseData }
      }
      if (!response?.exists()) {
        throw new json('Not Found',
          { status: 404, statusText: "Course is not present in DB" },
        );
      }
      return { data: 'No course' }
    } catch (error) {
      throw new json('', { status: error?.status || 500, statusText: error?.statusText || "Oops. You have found an unhandled error. Please contact the admin"})
    }
  }
}

export const CourseDetaisPage = () => {
  const { data: { id, ...courseData } } = useLoaderData()
  const px = { xs: 2.5, md: 3 }

  if (typeof courseData === 'string') return <Box px={px}>No course found</Box>

  console.log('courseData', courseData)
  const crumbs = [
    {
      title: 'Course Page',
      icon: <WorkIcon />,
      to: `/courses/${id}`
    }
  ]

  return (
    <>
      <Container maxWidth="xl" disableGutters sx={{ px }}>
        <Breadcrumbs crumbs={crumbs} />
        <Hero data={courseData} />
      </Container>

      <Box
        sx={{
          bgcolor: alpha(purple[700], 0.16),
          paddingY: { xs: 2.5, lg: 5 },
          marginY: "120px",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "start" },
            px,
          }}
        >
          <CourseTopicsList
            title="Key Course Topics"
            list={courseData.technologies}
          />
          <CourseTopicsList title="Course Features" list={mock.features} />
        </Container>
      </Box>

      <Container maxWidth="xl" disableGutters sx={{ px }}>
        <Grid container columns={2} width={'100%'} spacing={3}>
          <Grid xs={2} md={1}>
            <Box sx={{
              width: '100%',
              marginX: { xs: 'auto', md: 0 },
              maxWidth: 686
            }}>
            <Subheader component='div' mb={{ xs: 4, mb: 5 }}>Overall rating</Subheader>
              <CourseRatingSection {...courseData}/>
            </Box>
          </Grid>
          <Grid xs={2} md={1}>
            <Subheader mb={{ xs: 4, mb: 5 }}>Comments from the course</Subheader>
            <CourseCommentsList courseID={id} />
            {/* {!comments.length && <Typography variant="body1">No comments yet</Typography>}
            {comments && <Stack
              direction={'column'}
              useFlexGap
              spacing={{ xs: 2.5, md: 4 }}
              width={'100%'}
            >
              {comments.map((comment, index) => (
                <span key={index}>{comment?.text}</span>
              ))}
            </Stack>
            } */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
