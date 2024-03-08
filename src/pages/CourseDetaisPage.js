import { useLoaderData } from "react-router-dom"
import Box from "@mui/material/Box"

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