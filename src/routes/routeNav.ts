import { loginNav, loginResource, loginRoutes } from 'features/user/login/nav'
import {
  newsFeedMenu,
  newsFeedNav,
  newsFeedResource,
  newsFeedRoutes
} from 'features/newsFeed/nav'
import {
  registerNav,
  registerResource,
  registerRoutes
} from 'features/user/register/nav'
import {
  verifyEmailNav,
  verifyEmailResource,
  verifyEmailRoutes
} from 'features/user/verifyEmail/nav'
import {
  profileNav,
  profileResource,
  profileRoutes
} from 'features/profile/nav'
import {
  friendMenu,
  friendNav,
  friendResource,
  friendRoutes
} from 'features/friend/nav'
import {
  friendRequestMenu,
  friendRequestNav,
  friendRequestResource,
  friendRequestRoutes
} from 'features/friendRequest/nav'
import { chatNav, chatResource, chatRoutes } from 'features/chat/nav'
import { searchNav, searchResource, searchRoutes } from 'features/search/nav'

export const mainNav = [
  ...loginNav,
  ...registerNav,
  ...verifyEmailNav,

  ...profileNav,
  ...friendNav,
  ...friendRequestNav,
  ...chatNav,
  ...searchNav,

  ...newsFeedNav
]

export const routes = {
  ...loginRoutes,
  ...registerRoutes,
  ...verifyEmailRoutes,

  ...profileRoutes,
  ...friendRoutes,
  ...friendRequestRoutes,
  ...chatRoutes,
  ...searchRoutes,

  ...newsFeedRoutes
}

export const resources = {
  ...loginResource,
  ...registerResource,
  ...verifyEmailResource,

  ...profileResource,
  ...friendResource,
  ...friendRequestResource,
  ...chatResource,
  ...searchResource,

  ...newsFeedResource
}

export const menu = [...newsFeedMenu, ...friendMenu, ...friendRequestMenu]
