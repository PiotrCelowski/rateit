import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CourseTitle, CourseAuthor, RaitingText, Subheader } from "./CourseDetails.styled";

export const Hero = ({
  data: { title, author, rating, ratingVotes, description, photoUrl }
}) => {
  return (
    <Grid
      container
      columnSpacing={3}
      rowSpacing={{ xs: 3, md: 0 }}
      mt={{ xs: 1, md: 5 }}
    >
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
            <CourseTitle component="h1">{title}</CourseTitle>
            <CourseAuthor component="div" variant="h4">
              Created by {author}
            </CourseAuthor>
            <Stack direction="row" alignItems="center" useFlexGap gap={0.5}>
              <RaitingText component="div">{rating?.toFixed(1)}</RaitingText>
              <Rating name="read-only" value={rating} readOnly />
              <Typography
                component="div"
                variant="body1"
                color="text.secondary"
              >
                ({ratingVotes || 0} ratings)
              </Typography>
            </Stack>
          </Stack>
          {description && <Stack direction="column" useFlexGap gap={2}>
            <Subheader component='h3'>
              Description
            </Subheader>
            <Typography
              component="div"
              variant="h5"
              sx={(theme) => ({
                [theme.breakpoints.down("lg")]: {
                  fontSize: theme.typography.pxToRem(20),
                },
              })}
            >
              {description}
            </Typography>
          </Stack>}
        </Box>
      </Grid>
      <Grid item xs={12} md={6} order={{ xs: 0, md: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            placeContent: 'center',
            overflow: "clip",
            aspectRatio: '1.38 / 1'
          }}
        >
          <img src={photoUrl} alt={title} loading="lazy" />
        </Box>
      </Grid>
    </Grid>
  );
};
