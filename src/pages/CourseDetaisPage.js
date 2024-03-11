import { json, useLoaderData } from "react-router-dom"
import Box from "@mui/material/Box"
import { fetchCourse } from "../api/FirestoreApi";

export const getCourseDetails = async ({ params }) => {
  const { courseID } = params

  if (courseID) {
    try {
      const response = await fetchCourse(courseID);
      if (response.exists()) {
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
        return { data: courseData }
      }
      throw new json('Not Found',
        { status: 404, statusText: "Course is not exists in DB" },
      );
    } catch (error) {
      throw new json('', { status: error?.status || 500, statusText: error?.statusText})
    }
  }
}

export const CourseDetaisPage = () => {
  const { data } = useLoaderData()
  if (typeof data === 'string') return <Box px={{ xs: 2.5, md: 3 }} py={3} sx={{ flexGrow: 1 }}><div>No course found</div></Box>

  return (
    <Box px={{ xs: 2.5, md: 3 }} py={3} sx={{ flexGrow: 1 }}>
      <div>
        Course Name: { data?.title }
      </div>
    </Box>
  )
}