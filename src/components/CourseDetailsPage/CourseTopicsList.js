import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Subheader } from "./CourseDetails.styled";
import { styled } from "@mui/material";

const StyledList = styled(List) (({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: 0,
  fontWeight: 400,
  lineHeight: 1.3,
  '& .MuiListItem-root': {
    fontSize: theme.typography.pxToRem(24),
    padding: 0,
    [theme.breakpoints.down("lg")]: {
      fontSize: theme.typography.pxToRem(16),
    }
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 8,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 24,
    color: theme.palette.success.main
  }
}))

export const CourseTopicsList = ({ title, list }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 544 }}>
      <Subheader component='h3' mb={3}>
        {title}
      </Subheader>
      <StyledList>
        { list && list.map((item) => (
          <ListItem>
            <ListItemIcon><CheckIcon color='success' /></ListItemIcon>
            {item}
          </ListItem>
        ))}
      </StyledList>
    </Box>
  )
}
