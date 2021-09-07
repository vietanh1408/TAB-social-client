import { lazy } from 'react'
import { TeamOutlined } from '@ant-design/icons'
import { NavigatorParams } from 'Models'
import { createNav } from 'utils/createNav'
import { navName } from 'constants/navName'

const FriendPage = lazy(() => import('./index'))

export const friendNavName: string = 'friend'

const nav: NavigatorParams[] = [
  {
    component: FriendPage,
    isMenu: true,
    isProtected: true,
    icon: TeamOutlined,
    path: `${navName.FRIEND}`,
    isAuth: false
  }
]

export const { friendNav, friendResource, friendRoutes, friendMenu } =
  createNav({
    name: `${friendNavName}`,
    nav
  })
