declare module 'Models' {
  export interface NotificationType {
    user?: string
    url: string
    text: string
    image?: ImageType
    receivers: string
  }

  export interface NotificationState {
    notificationCount: number
    notification: any[]
    isLoading: boolean
  }
}
