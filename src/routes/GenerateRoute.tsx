// libs
import React from 'react'
import { Route, Switch } from 'react-router-dom'
// models
import { NavigatorParams } from 'Models'
// components
import ProtectedRoute from './ProtectedRoute'
import NotFoundPage from 'components/404Page'
// routes
import { mainNav } from './routeNav'

const GenerateRoute: React.FC = () => {
  return (
    <Switch>
      {mainNav.map((nav: NavigatorParams, index: number) => {
        if (nav?.isProtected) {
          return (
            <ProtectedRoute
              key={index}
              path={nav.path}
              component={nav.component}
            />
          )
        }
        return <Route key={index} path={nav.path} component={nav.component} />
      })}
      <Route render={() => <NotFoundPage />} />
    </Switch>
  )
}

export default GenerateRoute
