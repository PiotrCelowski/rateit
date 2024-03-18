import { useEffect, useState } from "react"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import buttonClasses from "@mui/material/Button/buttonClasses"
import Typography from "@mui/material/Typography"
import Collapse from "@mui/material/Collapse"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { TransitionGroup } from 'react-transition-group'
import { CourseComment } from "./CourseComment"

const VISIBLE_BY_DEFAULT = 6

const mockComments = [
  {
    author: {
      userName: 'Omar Sundaram',
      photoUrl: 'http://localhost:9199/v0/b/rateit-production.appspot.com/o/courseImages%2F3571f0b7-df37-40d7-b2a2-505ea7cbfd87?alt=media&token=a29b2aeb-dd4d-4e2a-8ec9-e946b97fc854'
    },
    text: 'This course really helped me grasp Figma.\nThe instructor explains everything clearly, and I gained a lot of practical experience.',
    createdAt: '23.12.23',
    rating: 5
  },
  {
    author: {
      userName: 'Sundaram Omar',
      photoUrl: ''
    },
    text: 'This course really helped me grasp Figma. The instructor explains everything clearly, and I gained a lot of practical experience.',
    createdAt: '23.12.23',
    rating: 4
  }
]
const mockLimit = 10
const initial = new Array(VISIBLE_BY_DEFAULT).fill(mockComments[0])

export const CourseCommentsList = ({ courseID }) => {

  const [comments, setComments] = useState([])
  const [totalComments, setTotalComments] = useState(0)

  // Todo: fetch comments with useEffect
  useEffect(() => {
    console.log('courseID', courseID)
    setComments(initial)
    setTotalComments(mockLimit)
  }, [])

  if (!comments?.length) return <Typography variant="body1" p={2}>No comments yet</Typography>

  const showMore = () => {
    return setComments([...comments, ...mockComments])
  }

  const showLess = () => {
    return setComments(initial)
  }

  function renderItem(comment) {
    return (
      <CourseComment {...comment} />
    )
  }

  const buttonSX = {
    fontSize: 24,
    borderRadius: 1,
    color: 'primary.light',
    [`& .${buttonClasses.startIcon}`]: {
      marginRight: 2
    },
    [`& .${buttonClasses.startIcon} > *:nth-of-type(1)`]: {
      fontSize: 35,
    },
  };

  return (
    <Stack
      direction={"column"}
      useFlexGap
      spacing={{ xs: 2.5, md: 4 }}
      width={"100%"}
    >
      <TransitionGroup>
        {comments.map((comment, index) => (
          <Collapse key={index}>{renderItem(comment)}</Collapse>
        ))}
      </TransitionGroup>
      {totalComments > VISIBLE_BY_DEFAULT && (
        <>
          {comments?.length >= totalComments ? (
            <Button
              sx={buttonSX}
              onClick={showLess}
              startIcon={<ExpandLessIcon />}
            >
              Show less
            </Button>
          ) : (
            <Button
              sx={buttonSX}
              onClick={showMore}
              startIcon={<ExpandMoreIcon />}
            >
              Show more
            </Button>
          )}
        </>
      )}
    </Stack>
  )
}