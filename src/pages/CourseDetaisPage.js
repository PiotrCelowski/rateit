import { json, useLoaderData } from "react-router-dom"
import { fetchCourse } from "../api/FirestoreApi";
import WorkIcon from '@mui/icons-material/Work';
import Box from "@mui/material/Box";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Container, Grid, Rating, Stack, Typography, styled } from "@mui/material";

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
          technologies: response.get('technologies')
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
  const { data: { id, ...data } } = useLoaderData()

  if (typeof data === 'string') return <div>No course found</div>

  console.log('data', data)
  const crumbs = [
    {
      title: 'Course Page',
      icon: <WorkIcon />,
      to: `/courses/${id}`
    }
  ]

// Todo: dont forget to export styled components
const RaitingText = styled(Typography) ({
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: 1.5,
  letterSpacing: '0.15px',
  color: '#FFB400'
})
const CourseTitle = styled(Typography) (({ theme }) => ({
  fontSize: theme.typography.pxToRem(60),
  fontWeight: 400,
  lineHeight: 1.2,
  letterSpacing: '-0.5px',
  textAlign: 'left',
  [theme.breakpoints.down('lg')]: {
    fontSize: theme.typography.pxToRem(40),
  }
}))
const CourseAuthor = styled(Typography) (({ theme }) => ({
  color: 'text.secondary',
  textTransform: 'capitalize',
  [theme.breakpoints.down('lg')]: {
    fontSize: theme.typography.pxToRem(24),
  }
}))

const mock = {
  description: "This course is designed for absolute beginners in Figma. Starting from the basics, you will gain the confidence to create interfaces and work with user experience. From foundational tools to advanced techniques, you'll have everything you need for successful design.",
}
  return (
    <Container maxWidth="xl" disableGutters>
      <Breadcrumbs crumbs={crumbs} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} order={1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 5,
            }}
          >
            <Stack direction="column" useFlexGap gap={1.5}>
              <CourseTitle component="h1">{data?.title}</CourseTitle>
              <CourseAuthor component="div" variant="h4">
                Created by {data?.author}
              </CourseAuthor>
              <Stack direction="row" alignItems="center" useFlexGap gap={0.5}>
                <RaitingText component="div">
                  {data?.rating?.toFixed(1)}
                </RaitingText>
                <Rating name="read-only" value={data?.rating} readOnly />
                <Typography
                  component="div"
                  variant="body1"
                  color="text.secondary"
                >
                  ({data?.ratingVotes || 0} ratings)
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="column" useFlexGap gap={2}>
              <Typography
                component="div"
                sx={(theme) => ({
                  fontWeight: 400,
                  fontSize: theme.typography.pxToRem(48),
                  lineHeight: 1.16,
                  [theme.breakpoints.down("lg")]: {
                    fontSize: theme.typography.pxToRem(32),
                  },
                })}
              >
                Description
              </Typography>
              <Typography component="div" variant="h5">
                {data?.description || mock?.description}
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 0, md: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'clip', maxHeight: { xs: 280, sm: 400, md: 570, lg: 600 } }}>
            <img
              src={data?.photoUrl}
              alt={data?.title}
              loading="lazy"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
