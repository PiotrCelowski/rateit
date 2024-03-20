import { json, useLoaderData } from "react-router-dom";
import { fetchCourse } from "../api/FirestoreApi";
import WorkIcon from '@mui/icons-material/Work';
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Hero } from "../components/CourseDetailsPage/Hero";
import { CourseTopicsList } from "../components/CourseDetailsPage/CourseTopicsList";
import { FeaturesSectionContainer, Subheader } from "../components/CourseDetailsPage/CourseDetails.styled";
import CourseRatingSection from "../components/CourseDetailsOverlay/CourseRatingSection";
import { CourseCommentsList } from "../components/CourseDetailsPage/CourseCommentsList";

const mockComments = [
  {
    userId: "0000",
    userName: "admin",
    averageUserRating: 4,
    comment: "Amazing course",
    photoUrl: 'http://localhost:9199/v0/b/rateit-production.appspot.com/o/courseImages%2F3571f0b7-df37-40d7-b2a2-505ea7cbfd87?alt=media&token=a29b2aeb-dd4d-4e2a-8ec9-e946b97fc854',
    createdAt: '23.12.23'
  },
  {
    userId: "0001",
    userName: "user",
    averageUserRating: 3,
    comment: "I dont like this course",
    photoUrl: '',
    createdAt: 1710449636750 // -- ToDo: add this field to firestore
  }
]

const mock = {
  description: "This course is designed for absolute beginners in Figma. Starting from the basics, you will gain the confidence to create interfaces and work with user experience. From foundational tools to advanced techniques, you'll have everything you need for successful design.",
  comments: new Array(8).fill(mockComments[0], 0, 4).fill(mockComments[1], 4)
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
          features: response?.get('features'),
          description: response?.get('description'),
          comments: response?.get('comments') || mock.comments
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
  const { technologies, features } = courseData

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

      <FeaturesSectionContainer maxWidth="xl" sx={{ px }}>
        {technologies && <CourseTopicsList title="Key Course Topics" list={technologies} />}
        {features && <CourseTopicsList title="Course Features" list={features} />}
      </FeaturesSectionContainer>

      <Container maxWidth="xl" disableGutters sx={{ px }}>
        <Grid container columns={2} columnSpacing={3} rowSpacing={{ xs: 7.5, sm: 10.5 }}>
          <Grid xs={2} md={1}>
            <Box sx={{
              marginX: { xs: 'auto', md: 0 },
              maxWidth: 686
            }}>
              <Subheader component='div' mb={{ xs: 4, mb: 5 }}>Overall rating</Subheader>
              <CourseRatingSection {...courseData}/>
            </Box>
          </Grid>
          <Grid xs={2} md={1}>
            <Subheader mb={{ xs: 4, mb: 5 }}>Comments from the course</Subheader>
            <CourseCommentsList comments={courseData?.comments || []} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
