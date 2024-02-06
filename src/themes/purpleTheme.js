import { purple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const lightPurpleTheme = createTheme({
  palette: {
    primary: {
      main: purple[300],
      secondary: '#fff'
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          boxShadow: 'none',
          textTransform: 'none',
          fontSize: 15,
          fontWeight: 500,
          lineHeight: 1.73,
          letterSpacing: 0.46,
        },
        containedPrimary: {
          padding: '7px 14px',
          border: '1px solid',
          boxSizing: 'content-box',
          borderColor: '#fff',
          backgroundColor: '#fff',
          color: purple[300],
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: purple[300],
            color: '#fff',
            borderColor: '#fff',
            boxShadow: 'none',
          },
        },
        outlinedPrimary: {
          border: '1px solid',
          borderColor: '#fff',
          padding: '7px 14px',
          color: '#fff',
          backgroundColor: 'transparent',
          boxSizing: 'content-box',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#fff',
            color: purple[300],
            borderColor: '#fff',
            boxShadow: 'none',
          },
        }
      }
    }
  }
})
