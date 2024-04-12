import React from 'react';
import Rating from "@mui/material/Rating";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from '@mui/material/Typography';
import { alpha, styled } from "@mui/material";
import { RATINGS } from '../../utils/constants';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto minmax(30px, auto)',
  gap: theme.spacing(2),
  padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
  '& .MuiListItemText-root .MuiTypography-root': {
    fontSize: theme.typography.h5.fontSize,
    lineHeight: theme.typography.h5.lineHeight,
    fontWeight: 400,
    letterSpacing: 0,
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.typography.subtitle1.fontSize,
      lineHeight: theme.typography.subtitle1.lineHeight,
    },
  },
  [theme.breakpoints.up('lg')]: {
    padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`
  },
  "&:nth-of-type(odd)": { 
    backgroundColor: alpha(theme.palette.secondary.main, 0.15)
  }
}))

// ToDo: Add tooltips?

const CourseRatingSection = (props) => {
  return (
    <List sx={{ maxWidth: 686 }}>
      <StyledListItem>
        <ListItemText>{RATINGS.rating.title}</ListItemText>
          <Rating name="read-only" value={props?.rating} readOnly />
          <Typography component="div" color="text.secondary">
            ({props?.ratingVotes || 0})
          </Typography>
      </StyledListItem>
      <StyledListItem>
        <ListItemText>{RATINGS.codeSnippetsWorking.title}</ListItemText>
          <Rating name="read-only" value={props?.codeSnippetsWorking} readOnly />
      </StyledListItem>
      <StyledListItem>
        <ListItemText>{RATINGS.easilyExplained.title}</ListItemText>
          <Rating name="read-only" value={props?.easilyExplained} readOnly />
      </StyledListItem>
      <StyledListItem>
        <ListItemText>{RATINGS.keptUpToDate.title}</ListItemText>
          <Rating name="read-only" value={props?.keptUpToDate} readOnly />
      </StyledListItem>
      <StyledListItem>
        <ListItemText>{RATINGS.topicCoverage.title}</ListItemText>
          <Rating name="read-only" value={props?.topicCoverage} readOnly />
      </StyledListItem>
      <StyledListItem>
        <ListItemText>{RATINGS.organization.title}</ListItemText>
          <Rating name="read-only" value={props?.organization} readOnly />
      </StyledListItem>
    </List>
  )
}

export default CourseRatingSection;
