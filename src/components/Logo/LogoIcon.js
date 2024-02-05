import { Box } from '@mui/material'

export const Logo = ({ sx, ...props }) => {
  const url = '/static/images/Logo_white.svg'
  return (
    <Box
      {...props}
      component="img"
      sx={{
        ...sx,
        height: 24,
        width: 199,
        maxHeight: { xs: 16, md: 20 },
        maxWidth: { xs: 133, md: 165 },
        cursor: 'pointer'
      }}
      src={url}
      alt="R4te it!"
    />
  )
}
