import { lazy } from 'react'
import { UserAddOutlined } from '@ant-design/icons'
import { NavigatorParams } from 'Models'
import { createNav } from 'utils/createNav'
import { navName } from 'constants/navName'

const FriendRequestPage = lazy(() => import('./index'))

export const friendRequestNavName: string = 'friendRequest'

const nav: NavigatorParams[] = [
  {
    component: FriendRequestPage,
    isMenu: true,
    isProtected: true,
    icon: UserAddOutlined,
    path: `${navName.ADD_FRIEND}`,
    isAuth: false
  }
]

export const {
  friendRequestNav,
  friendRequestResource,
  friendRequestRoutes,
  friendRequestMenu
} = createNav({
  name: `${friendRequestNavName}`,
  nav
})
