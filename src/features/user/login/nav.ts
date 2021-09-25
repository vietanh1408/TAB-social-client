import { navName } from 'constants/navName'
import { NavigatorParams } from 'Models'
import { lazy } from 'react'
import { createNav } from 'utils/createNav'

const Login = lazy(() => import('./Login'))

export const loginNavName: string = 'login'

const nav: NavigatorParams[] = [
  {
    component: Login,
    isMenu: false,
    isProtected: false,
    path: `${navName.LOGIN}`,
    isAuth: false
  }
]

export const { loginNav, loginResource, loginRoutes, loginMenu } = createNav({
  name: `${loginNavName}`,
  nav
})
