import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    navigateLink: string,
    children: JSX.Element
}

export const RouterLink: React.FC<Props> = ({ navigateLink, children}) => {
  return (
      <Link to={navigateLink}>{children}</Link>
  )
}
