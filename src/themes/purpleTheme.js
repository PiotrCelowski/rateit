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
          fontWeight: 500,
          fontSize: '15px',
        },
        containedPrimary: {
          border: '1px solid',
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
          color: '#fff',
          backgroundColor: purple[300],
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
