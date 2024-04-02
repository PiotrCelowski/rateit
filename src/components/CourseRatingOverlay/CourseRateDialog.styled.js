import Dialog from '@mui/material/Dialog';
import { styled } from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    flexGrow: 1,
    margin: theme.spacing(2.5),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(3),
    }
  },
  '& .MuiDialogTitle-root': {
    padding: theme.spacing(2.5),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
      paddingBottom: theme.spacing(3),
    }
  },
  '.MuiDialogContent-root': {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      paddingBottom: theme.spacing(1),
    }
  },
  '& .MuiDialogContentText-root': {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
    }
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(1)
    }
  }
}))
