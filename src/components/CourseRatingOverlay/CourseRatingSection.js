import React from 'react';
import Rating from "@mui/material/Rating";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { alpha, styled } from "@mui/material";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  alignItems: 'center',
  gap: theme.spacing(1),
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
  console.log('props?.rating', props?.rating)
  const mapFields = {
    rating: {
      value: props?.rating,
      onChange: props?.ratingChangeHandler,
      labelText: 'Overall rating:'
    },
    codeSnippetsWorking: {
      value: props?.codeSnippetsWorking,
      onChange: props?.snippetsChangeHandler,
      labelText: 'Are code snippets working:',
    },
    easilyExplained: {
      value: props?.easilyExplained,
      onChange: props?.explanationHandler,
      labelText: 'Is simply explained:',
    },
    keptUpToDate: {
      value: props?.keptUpToDate,
      onChange: props?.upToDateHandler,
      labelText: 'Is up to date:',
    },
    topicCoverage: {
      value: props?.topicCoverage,
      onChange: props?.coverageHandler,
      labelText: 'Is everything covered:',
    },
    organization: {
      value: props?.organization,
      onChange: props?.organizationHandler,
      labelText: 'Is well organized:',
    }
  }

  const renderListItem = (key) => {
    return (
      <StyledListItem key={key}>
        <ListItemText>{mapFields[key]?.labelText}</ListItemText>
        <Rating name={key} value={mapFields[key]?.value} onChange={mapFields[key]?.onChange}/>
      </StyledListItem>
    )
  }

  return (
    <List sx={{ maxWidth: 686 }}>
      {Object.keys(mapFields).map((key) => renderListItem(key))}
    </List>
  )
}

export default CourseRatingSection;
