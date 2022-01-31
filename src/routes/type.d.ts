import { ReactComponentElement, ReactNode } from 'react'

declare module 'Models' {
  export interface Navigator {
    menuName?: string
    name: string
    nav: NavigatorParams[]
  }

  export interface NavigatorParams {
    key?: string
    path: string
    component?: ReactNode | ReactDOM | ReactComponentElement
    isMenu: boolean
    isProtected: boolean
    icon?: ReactNode | ReactDOM | ReactComponentElement
    menuName?: string
    children?: Navigator[]
    isAuth?: boolean
  }
}
