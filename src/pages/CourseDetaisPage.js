import { json, useLoaderData } from "react-router-dom";
import { fetchCourse } from "../api/FirestoreApi";
import WorkIcon from '@mui/icons-material/Work';
import Container from '@mui/material/Container';
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Hero } from "../components/CourseDetailsPage/Hero";

const mock = {
  description: "This course is designed for absolute beginners in Figma. Starting from the basics, you will gain the confidence to create interfaces and work with user experience. From foundational tools to advanced techniques, you'll have everything you need for successful design.",
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

  if (typeof courseData === 'string') return <div>No course found</div>

  // console.log('courseData', courseData)
  const crumbs = [
    {
      title: 'Course Page',
      icon: <WorkIcon />,
      to: `/courses/${id}`
    }
  ]

  return (
    <Container maxWidth="xl" disableGutters>
      <Breadcrumbs crumbs={crumbs} />
      <Hero data={courseData} />
    </Container>
  );
}
