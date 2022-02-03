declare module 'Models' {
  export interface CreateMessage {
    receiver?: string
    message?: string
    roomId?: string
    sender?: string
  }

  export interface MessageType {
    createdAt: Date
    from: Partial<UserType>
    isRead: boolean
    isYour: boolean
    message: string
    roomId: string
    to: string[]
    updatedAt: Date
  }

  export interface RoomType {
    createdAt: Date
    name: string
    updatedAt: Date
    users: Partial<UserType[]>
    _id: string
  }

  export interface ConversationsType {
    friend: Partial<UserType>
    message: Partial<MessageType>
    room: Partial<RoomType>
  }
}
