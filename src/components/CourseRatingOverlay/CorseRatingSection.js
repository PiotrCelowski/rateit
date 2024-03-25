import React from 'react';
import Rating from "@mui/material/Rating";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { alpha, styled } from "@mui/material";
import { Controller } from 'react-hook-form';

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

const CourseRatingSection = ({ control }) => {
  const mapFields = {
    rating: 'Overall rating:',
    codeSnippetsWorking: 'Are code snippets working:',
    easilyExplained: 'Is simply explained:',
    keptUpToDate: 'Is up to date:',
    topicCoverage: 'Is everything covered:',
    organization: 'Is well organized:',
  }

  const renderListItem = (key) => {
    return (
      <StyledListItem key={key}>
        <ListItemText>{mapFields[key]}</ListItemText>
        <Controller
          control={control}
          name={key}
          render={({ field }) => (
            <Rating value={field?.value || null} onChange={(_event, newValue) => field.onChange(newValue)}/>
          )} />
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
