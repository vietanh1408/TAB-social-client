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

export const mainNav = [...loginNav, ...registerNav, ...newsFeedNav]

export const routes = {
  ...loginRoutes,
  ...registerRoutes,
  ...newsFeedRoutes
}

export const resources = {
  ...loginResource,
  ...registerResource,
  ...newsFeedResource
}

export const menu = [...newsFeedMenu]
