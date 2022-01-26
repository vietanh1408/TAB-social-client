import { lazy } from 'react'
import { createNav } from 'utils/createNav'
import { NavigatorParams } from 'Models'
import { navName } from 'constants/navName'

const SearchResultList = lazy(() => import('./SearchResultList'))

export const searchNavName = 'search'

export const nav: NavigatorParams[] = [
  {
    path: `${navName.SEARCH}`,
    isMenu: false,
    isProtected: true,
    component: SearchResultList
  }
]

export const { searchNav, searchResource, searchRoutes, searchMenu } =
  createNav({
    name: searchNavName,
    nav
  })
