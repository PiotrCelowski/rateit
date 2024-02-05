import { Box, Drawer, IconButton, List, MenuList } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

export const MobileMenu = ({ children, open, setOpen }) => {
  const handleClose = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(false);
  };
  const handleOpen = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(true);
  };

  return (
    <div>
      <IconButton onClick={handleOpen} color='inherit'>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={'right'}
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={{ width: '100vw' }}
          role="presentation"
          onClick={handleClose}
          onKeyDown={handleClose}
        >
          <MenuList variant='menu'>
            {children}
          </MenuList>
        </Box>
      </Drawer>
    </div>
  )
}
