import { lazy } from 'react'
import { NavigatorParams } from 'Models'
import { createNav } from 'utils/createNav'
import { navName } from 'constants/navName'

const VerifyEmail = lazy(() => import('./VerifyEmail'))

export const verifyEmailNavName: string = 'verifyEmail'

const nav: NavigatorParams[] = [
  {
    component: VerifyEmail,
    isMenu: false,
    isProtected: true,
    path: `${navName.VERIFY_EMAIL}`,
    isAuth: false
  }
]

export const {
  verifyEmailNav,
  verifyEmailResource,
  verifyEmailRoutes,
  verifyEmailMenu
} = createNav({
  name: `${verifyEmailNavName}`,
  nav
})
