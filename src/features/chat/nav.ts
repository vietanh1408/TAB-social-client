import { lazy } from 'react'
import { TeamOutlined } from '@ant-design/icons'
import { NavigatorParams } from 'Models'
import { createNav } from 'utils/createNav'
import { navName } from 'constants/navName'

const ChatPage = lazy(() => import('./index'))

export const chatNavName: string = 'chat'

const nav: NavigatorParams[] = [
  {
    component: ChatPage,
    isMenu: true,
    isProtected: true,
    icon: TeamOutlined,
    path: `${navName.CHAT}`,
    isAuth: false
  }
]

export const { chatNav, chatResource, chatRoutes, chatMenu } = createNav({
  name: `${chatNavName}`,
  nav
})
