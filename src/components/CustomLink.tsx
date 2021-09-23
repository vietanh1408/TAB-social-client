import React from 'react'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'

type CustomLinkProps = {
  to: string
  activeOnlyWhenExact?: boolean
  children: any
  className?: string
}

const CustomLink: React.FC<CustomLinkProps> = (props: CustomLinkProps) => {
  const { to, activeOnlyWhenExact = true, children, className } = props
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <Link
          className={match ? `active-link ${className}` : `${className}`}
          to={to}
        >
          {children}
        </Link>
      )}
    />
  )
}

export default CustomLink
