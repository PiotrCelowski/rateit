import { json, useLoaderData } from "react-router-dom"
import { fetchCourse } from "../api/FirestoreApi";
import WorkIcon from '@mui/icons-material/Work';
import Box from "@mui/material/Box";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { useMediaQuery, useTheme } from "@mui/material";

export const getCourseDetails = async ({ params }) => {
  const { courseID } = params

  if (courseID) {
    try {
      const response = await fetchCourse(courseID);
      if (response?.exists()) {
        const courseData = {
          title: response.data()?.title,
          author: response.data()?.author,
          rating: response.data()?.rating,
          ratingVotes: response.data()?.ratingVotes,
          codeSnippetsWorking: response.data()?.codeSnippetsWorking,
          easilyExplained: response.data()?.easilyExplained,
          keptUpToDate: response.data()?.keptUpToDate,
          topicCoverage: response.data()?.topicCoverage,
          organization: response.data()?.organization
        }
        return { data: courseData, id: courseID }
      }
      if (!response?.exists()) {
        throw new json('Not Found',
          { status: 404, statusText: "Course is not exists in DB" },
        );
      }
      return { data: 'No course' }
    } catch (error) {
      throw new json('', { status: error?.status || 500, statusText: error?.statusText || "Oops. You have found an unhandled error. Please contact the admin"})
    }
  }
}

export const CourseDetaisPage = () => {
  const { data, id } = useLoaderData()
  // -- if we want to use Breadcrumbs only for desktop view -- ?
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  if (typeof data === 'string') return <div>No course found</div>

  // console.log('data', data)
  const crumbs = [
    {
      title: 'Course Page',
      icon: <WorkIcon />,
      to: `/courses/${id}`
    }
  ]

  return (
    <>
      {isDesktop && <Breadcrumbs crumbs={crumbs} />}
      <Box>
        Course Name: { data?.title }
      </Box>
    </>
  )
}
