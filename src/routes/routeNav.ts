import { loginNav, loginResource, loginRoutes } from 'features/auth/login/nav'
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
} from 'features/auth/register/nav'
import {
  verifyEmailNav,
  verifyEmailResource,
  verifyEmailRoutes
} from 'features/auth/verifyEmail/nav'
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

export const mainNav = [
  ...loginNav,
  ...registerNav,
  ...verifyEmailNav,

  ...profileNav,
  ...friendNav,
  ...friendRequestNav,

  ...newsFeedNav
]

export const routes = {
  ...loginRoutes,
  ...registerRoutes,
  ...verifyEmailRoutes,

  ...profileRoutes,
  ...friendRoutes,
  ...friendRequestRoutes,

  ...newsFeedRoutes
}

export const resources = {
  ...loginResource,
  ...registerResource,
  ...verifyEmailResource,

  ...profileResource,
  ...friendResource,
  ...friendRequestResource,

  ...newsFeedResource
}

export const menu = [...newsFeedMenu, ...friendMenu, ...friendRequestMenu]
