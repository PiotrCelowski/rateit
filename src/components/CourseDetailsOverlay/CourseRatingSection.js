import React from 'react';
import Rating from "@mui/material/Rating";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from '@mui/material/Typography';
import { alpha, styled } from "@mui/material";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto 30px',
  gap: theme.spacing(2),
  padding: `${theme.spacing(0.75)} ${theme.spacing(1)}`,

  fontSize: theme.typography.h5.fontSize,
  lineHeight: theme.typography.h5.lineHeight,
  fontWeight: 400,
  letterSpacing: 0,
  [theme.breakpoints.down('lg')]: {
    fontSize: theme.typography.subtitle1.fontSize,
    lineHeight: theme.typography.subtitle1.lineHeight,
  },
  "&:nth-of-type(odd)": { 
    backgroundColor: alpha(theme.palette.secondary.main, 0.15)
  }
}))

const CourseRatingSection = (props) => {
  return (
    <List sx={{ 
      width: '100%',
      maxWidth: 686
    }}>
      <StyledListItem>
        <ListItemText>Overall rating:</ListItemText>
          <Rating name="read-only" value={props?.rating} readOnly />
          <Typography component="div" color="text.secondary">
            ({props?.ratingVotes})
          </Typography>
      </StyledListItem>
      <StyledListItem>
        <ListItemText>Are code snippets working:</ListItemText>
          <Rating name="read-only" value={props?.codeSnippetsWorking} readOnly />
      </StyledListItem>
      <StyledListItem>
        <ListItemText>Is simply explained:</ListItemText>
          <Rating name="read-only" value={props?.easilyExplained} readOnly />
      </StyledListItem>
      <StyledListItem>
        <ListItemText>Is up to date:</ListItemText>
          <Rating name="read-only" value={props?.keptUpToDate} readOnly />
      </StyledListItem>
      <StyledListItem>
        <ListItemText>Is everything covered:</ListItemText>
          <Rating name="read-only" value={props?.topicCoverage} readOnly />
      </StyledListItem>
      <StyledListItem>
        <ListItemText>Is well organized:</ListItemText>
          <Rating name="read-only" value={props?.organization} readOnly />
      </StyledListItem>
    </List>
  )
}

export default CourseRatingSection;
