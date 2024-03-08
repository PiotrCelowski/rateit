import Filters from "./Filters";
import Drawer from "@mui/material/Drawer"
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Close } from "@mui/icons-material";

export const FiltersDrawer = ({ open, toggle }) => {
  return (
    <>
      <Drawer
        open={open}
        onClose={toggle(false)}
        anchor="left"
        variant="persistent"
      >
        <Box sx={{ width: 256 }} role="presentation">
          <Toolbar>
            <Typography component="h2" variant="h5" flexGrow={1}>
              Filters
            </Typography>
            <IconButton onClick={toggle(false)}>
              <Close />
            </IconButton>
          </Toolbar>
          <Filters />
        </Box>
      </Drawer>
      <Backdrop open={open} onClick={toggle(false)} />
    </>
  );
};
