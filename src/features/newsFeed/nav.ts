import { lazy } from 'react'
import { TeamOutlined } from '@ant-design/icons'
import { NavigatorParams } from 'Models'
import { createNav } from 'utils/createNav'
import { navName } from 'constants/navName'

const NewsFeed = lazy(() => import('./NewsFeed'))

export const newsFeedNavName: string = 'newsFeed'

const nav: NavigatorParams[] = [
  {
    component: NewsFeed,
    isMenu: true,
    isProtected: true,
    icon: TeamOutlined,
    path: `${navName.HOME}`,
    isAuth: false
  }
]

export const { newsFeedNav, newsFeedResource, newsFeedRoutes, newsFeedMenu } =
  createNav({
    name: `${newsFeedNavName}`,
    nav
  })
