import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate()
  const goBack = () => navigate(-1, { replace: true })

  if (isRouteErrorResponse(error)) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: 2,
        placeSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography variant='h4' component='div'>Oops!</Typography>
        <Typography variant='h2' component='h2' gutterBottom>{error?.status}</Typography>
        <Typography variant='body1' component='p'>{error?.statusText}</Typography>
        {error.data?.message && <Typography variant='body2' component='div'>{error.data.message}</Typography>}
        <Button variant='contained' color="inherit" sx={{ textTransform: 'uppercase', mt: 4, minWidth: 120 }} onClick={goBack}>
          Go Back
        </Button>
      </Box>
    );
  } else {
    return <Typography variant='h3' component='div'>Oops</Typography>;
  }
}
