import React from 'react';
import Rating from "@mui/material/Rating";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { alpha, styled } from "@mui/material";
import { Controller } from 'react-hook-form';

const ALERT_TEXT = '*Overall rating field is required for submit.'

const StyledListItem = styled(ListItem)(({ theme }) => ({
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
  '& .MuiListItemText-root .MuiTypography-root': {
    fontWeight: 400,
    letterSpacing: 0,
    fontSize: theme.typography.subtitle1.fontSize,
    lineHeight: theme.typography.subtitle1.lineHeight,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
      lineHeight: 1.75,
      letterSpacing: 0.15,
    },
  },
  "&:nth-of-type(odd)": { 
    backgroundColor: alpha(theme.palette.secondary.main, 0.15)
  }
}))

const CourseRatingSection = ({ control, readOnly }) => {
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
        <ListItemText sx={{ fontSize: 'inherit'}}>{mapFields[key]}</ListItemText>
        <Controller
          control={control}
          name={key}
          rules={{ required: key === 'rating' ? ALERT_TEXT : false }}
          render={({ field: { value, onChange, ...props} }) => (
            <Rating {...props} value={value || 0} onChange={(_event, newValue) => onChange(newValue)} readOnly={readOnly} />
          )} />
      </StyledListItem>
    )
  }

  return (
    <List disablePadding>
      {Object.keys(mapFields).map((key) => renderListItem(key))}
    </List>
  )
}

export default CourseRatingSection;
