import React from 'react'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'

type CustomLinkProps = {
  to: string
  activeOnlyWhenExact?: boolean
  children: any
}

const CustomLink = (props: CustomLinkProps) => {
  const { to, activeOnlyWhenExact = true, children } = props
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <Link
          className={match ? `w-full h-full active-link` : `w-full h-full`}
          to={to}
        >
          {children}
        </Link>
      )}
    />
  )
}

export default CustomLink
