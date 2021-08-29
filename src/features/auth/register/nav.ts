import { lazy } from 'react'
import { NavigatorParams } from 'Models'
import { createNav } from 'utils/createNav'
import { navName } from 'constants/navName'

const Register = lazy(() => import('./Register'))

export const registerNavName: string = 'register'

const nav: NavigatorParams[] = [
  {
    component: Register,
    isMenu: false,
    isProtected: false,
    path: `${navName.REGISTER}`,
    isAuth: false
  }
]

export const { registerNav, registerResource, registerRoutes, registerMenu } =
  createNav({
    name: `${registerNavName}`,
    nav
  })
