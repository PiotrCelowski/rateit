import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import MUIBreadcrumbs from '@mui/material/Breadcrumbs'
import { BreadcrumbLink } from './BreadcrumbLink'

export const Breadcrumbs = ({ crumbs }) => {
  return (
    <React.Fragment>
      <MUIBreadcrumbs aria-label='breadcrumb'>
        <BreadcrumbLink to={'/'} underline='hover'>
          <HomeIcon />
        </BreadcrumbLink>
        {crumbs.map((crumb, index) => (
          <BreadcrumbLink
            key={crumb?.to || index}
            to={crumb?.to || ''}
            underline='hover'
          >
            {crumb?.icon}
            {crumb?.title || ''}
          </BreadcrumbLink>
        ))}
      </MUIBreadcrumbs>
    </React.Fragment>
  )
}
