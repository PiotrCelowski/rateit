import Button from "@mui/material/Button";
import { alpha, styled } from '@mui/material/styles';

export const PrimaryButton = styled(Button)(({ theme, variant, color }) => ({
  padding: `${theme.typography.pxToRem(7)} ${theme.typography.pxToRem(14)}`,
  minWidth: '120px',
  height: theme.typography.pxToRem(40),
  borderRadius: 100,

  flexGrow: 1,
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: theme.typography.pxToRem(20),
  lineHeight: '130%',
  letterSpacing: '0.46px',
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.pxToRem(18),
  },
  '&:disabled': {
    color: `rgba(0, 0, 0, 0.38)`,
    background: `rgba(0, 0, 0, 0.08)`
  },
  ...(variant === 'contained' && {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  }),
  ...(variant === 'outlined' && {
    border: `1px solid ${theme.palette.secondary.dark}`,
    color: theme.palette.secondary.dark,
    '&:hover': {
      backgroundColor: alpha(theme.palette.secondary.dark, theme.palette.action.hoverOpacity),
      border: `1px solid ${theme.palette.secondary.dark}`,
    },
  }),
}))
