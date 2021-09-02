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

export const mainNav = [
  ...loginNav,
  ...registerNav,
  ...verifyEmailNav,

  ...profileNav,

  ...newsFeedNav
]

export const routes = {
  ...loginRoutes,
  ...registerRoutes,
  ...verifyEmailRoutes,

  ...profileRoutes,

  ...newsFeedRoutes
}

export const resources = {
  ...loginResource,
  ...registerResource,
  ...verifyEmailResource,

  ...profileResource,

  ...newsFeedResource
}

export const menu = [...newsFeedMenu]
