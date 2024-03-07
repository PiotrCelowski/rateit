import IconButton from "@mui/material/IconButton";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useMediaQuery, useTheme } from "@mui/material";

export const FilterMobileButton = ({ onClick }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isHidden = useMediaQuery(theme.breakpoints.up('md'))

  if (isHidden) return null

  return (
    <IconButton size={isMobile ? 'small' : 'large'} sx={{ flexShrink: 0 }} onClick={onClick}>
      <FilterAltIcon color='inherit' fontSize={isMobile ? 'medium' : 'large'} />
    </IconButton>
  )
}