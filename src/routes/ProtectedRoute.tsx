// libs
import NotFoundPage from 'components/404Page'
import { useGetAuth } from 'features/auth/hooks'
import React from 'react'
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps
} from 'react-router-dom'
// routes
import { routes } from './routeNav'

type RouteComponent =
  | React.FunctionComponent<RouteComponentProps<any>>
  | React.ComponentClass<any>

interface Iprops {
  component: RouteComponent
  resource?: string
  path?: string
  isAuth?: boolean
  isProtected?: boolean
}

const ProtectedRoute: React.FC<RouteProps & Iprops> = (
  props: RouteProps & Iprops
) => {
  const { component, resource, path, isAuth, isProtected, ...rest } = props
  const { token } = useGetAuth()
  const renderFn = (Component?: RouteComponent) => (props: RouteProps) => {
    if (!Component) {
      return <NotFoundPage />
    }
    //@ts-ignore
    return token ? <Component {...props} /> : <Redirect to={routes.login} />
  }

  return <Route {...rest} render={renderFn(component)} />
}

export default ProtectedRoute
