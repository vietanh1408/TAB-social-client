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

export const mainNav = [
  ...loginNav,
  ...registerNav,
  ...verifyEmailNav,

  ...newsFeedNav
]

export const routes = {
  ...loginRoutes,
  ...registerRoutes,
  ...verifyEmailRoutes,

  ...newsFeedRoutes
}

export const resources = {
  ...loginResource,
  ...registerResource,
  ...verifyEmailResource,

  ...newsFeedResource
}

export const menu = [...newsFeedMenu]
