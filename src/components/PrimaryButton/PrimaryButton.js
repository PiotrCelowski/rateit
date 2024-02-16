import { Button, styled } from "@mui/material"

export const PrimaryButton = styled(Button)(({theme}) => ({
  padding: `${theme.typography.pxToRem(7)} ${theme.typography.pxToRem(14)}`,
  minWidth: '120px',
  height: theme.typography.pxToRem(40),
  backgroundColor: theme.palette.secondary.dark,
  borderRadius: 100,
  flexGrow: 1,
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: theme.typography.pxToRem(20),
  lineHeight: '130%',
  letterSpacing: '0.46px',
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  }
}))