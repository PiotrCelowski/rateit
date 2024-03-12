import { Link, styled } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: '20px',
  lineHeight: '32px',
}))

export const BreadcrumbLink = ({ children, ...props }) => {
  return (
    <StyledLink {...props} component={RouterLink}>
      {children}
    </StyledLink>
  )
}
