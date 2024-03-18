import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Rating from "@mui/material/Rating"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"

export const CourseComment = ({ author, createdAt, text, rating }) => {
  // ToDo: if createdAt is TimeStamp format/type -> add dayjs(createdAt).format(<suitable_format>)

  const { userName, photoUrl } = author
  return (
    <Box sx={{
      paddingY: 2,
      paddingX: { xs: 0, sm: 2 },
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      columnGap: 1
    }}>
      <Avatar src={photoUrl} alt={userName}>{userName[0]}</Avatar>
      <Stack direction='column' useFlexGap spacing={1}>
        <Rating readOnly value={rating} />
        <Typography variant='subtitle2'>{userName} • {createdAt}</Typography>
        <Typography variant="body1" whiteSpace='break-spaces'>{text}</Typography>
      </Stack>
    </Box>
  )
}
