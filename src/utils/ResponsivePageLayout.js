import { Outlet } from "react-router-dom"
import Box from "@mui/material/Box"

export const ResponsivePageLayout = () => {
  return (
    <Box px={{ xs: 2.5, md: 3 }} py={{ xs: 4, md: 5 }} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Outlet />
    </Box>
  )
}
