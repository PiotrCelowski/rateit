import { useMemo } from "react"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Rating from "@mui/material/Rating"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import dayjs from "dayjs"

export const CourseComment = ({ userName = 'user', rating, comment, photoUrl, createdAt }) => {
  const isValidTime = useMemo(() => createdAt && dayjs(createdAt).isValid(), [createdAt])
  const formattedTime = useMemo(() => isValidTime ? dayjs(createdAt).format('DD.MM.YY') : createdAt, [isValidTime, createdAt])

  return (
    <Box sx={{
      paddingY: 2,
      paddingX: { xs: 0, sm: 2 },
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      columnGap: 1
    }}>
      <Avatar src={photoUrl} alt={userName}>{userName[0]?.toUpperCase()}</Avatar>
      <Stack direction='column' useFlexGap spacing={1}>
        <Rating readOnly value={rating} />
        <Typography variant='subtitle2'>{userName} • {formattedTime}</Typography>
        <Typography variant="body1" whiteSpace='break-spaces'>{comment}</Typography>
      </Stack>
    </Box>
  )
}
