import { Button } from "@mui/material";

export const BarButton = ({ children, ...props }) => (
  <Button
    variant='contained'
    color='primary'
    {...props}
  >
    {children}
  </Button>
)