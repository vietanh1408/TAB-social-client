declare module 'Models' {
  export interface CreateMessage {
    receiver: string
    message: string
    roomId?: string
  }
}
