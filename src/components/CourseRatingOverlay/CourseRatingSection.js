import React from 'react';
import Rating from "@mui/material/Rating";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Tooltip, alpha, styled, tooltipClasses, useMediaQuery, useTheme } from "@mui/material";
import { Controller } from 'react-hook-form';
import { RATINGS } from '../../utils/constants';

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

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    maxWidth: 300
  },
  [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
      marginBottom: '4px',
    },
}));

const CourseRatingSection = ({ control, readOnly }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // -- On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. --

  const renderListItem = (key) => {
    return (
      <StyledListItem key={key}>
        <LightTooltip title={RATINGS[key].description} placement='top-start' arrow>
          <ListItemText sx={{ fontSize: 'inherit'}}>{RATINGS[key].title}</ListItemText>
        </LightTooltip>
        <Controller
          control={control}
          name={key}
          rules={{ required: true }}
          render={({ field: { value, onChange, ...props} }) => (
            <Rating {...props} value={value || 0} onChange={(_event, newValue) => onChange(newValue)} readOnly={readOnly} size={ isMobile ? 'small' : 'medium' } />
          )} />
      </StyledListItem>
    )
  }

  return (
    <List disablePadding>
      {Object.keys(RATINGS).map((key) => renderListItem(key))}
    </List>
  )
}

export default CourseRatingSection;
