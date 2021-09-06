import { lazy } from 'react'
import { createNav } from 'utils/createNav'
import { NavigatorParams } from 'Models'
import { navName } from 'constants/navName'

const Profile = lazy(() => import('./Profile'))

export const profileNavName = 'profile'

export const nav: NavigatorParams[] = [
  {
    path: `${navName.PROFILE}/:id`,
    isMenu: false,
    isProtected: true,
    component: Profile
  }
]

export const { profileNav, profileResource, profileRoutes, profileMenu } =
  createNav({
    name: profileNavName,
    nav
  })
