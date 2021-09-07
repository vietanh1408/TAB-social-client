import { lazy } from 'react'
import { HomeOutlined } from '@ant-design/icons'
import { NavigatorParams } from 'Models'
import { createNav } from 'utils/createNav'
import { navName } from 'constants/navName'

const NewsFeed = lazy(() => import('./index'))

export const newsFeedNavName: string = 'newsFeed'

const nav: NavigatorParams[] = [
  {
    component: NewsFeed,
    isMenu: true,
    isProtected: true,
    icon: HomeOutlined,
    path: `${navName.HOME}`,
    isAuth: false
  }
]

export const { newsFeedNav, newsFeedResource, newsFeedRoutes, newsFeedMenu } =
  createNav({
    name: `${newsFeedNavName}`,
    nav
  })
