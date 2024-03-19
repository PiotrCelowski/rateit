import { useMemo, useState } from "react"
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

export const CourseCommentsList = ({ comments }) => {
  const initialVisibleComments = useMemo(() => comments?.slice(0, VISIBLE_BY_DEFAULT), [comments])
  const totalComments = useMemo(() => comments?.length || 0, [comments])

  const [visibleComments, setVisibleComments] = useState(initialVisibleComments)

  if (!totalComments) return <Typography variant="body1" p={2}>No comments yet</Typography>

  const showMore = () => {
    return setVisibleComments(comments)
  }

  const showLess = () => {
    return setVisibleComments(initialVisibleComments)
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
        {visibleComments?.map((comment, index) => (
          <Collapse key={index}>{renderItem(comment)}</Collapse>
        ))}
      </TransitionGroup>
      {totalComments > VISIBLE_BY_DEFAULT && (
        <>
          {visibleComments?.length >= totalComments ? (
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