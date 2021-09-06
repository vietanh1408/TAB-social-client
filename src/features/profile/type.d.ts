declare module 'Models' {
  export interface ProfileType {
    _id: string
    name: string
    email: string
    phone: string
    password: string
    avatar: string | undefined
    background: string | undefined
    gender: Number
    friends: Array
    followers: Array
    followings: Array
    description: string
    city: string
    from: string
    relationship: Number
    sendFriendRequests: Array
    friendRequests: Array
    blockUsers: Array
    createdAt: Date
    isVerifiedMail: Boolean
    verifyCode: string
  }

  export interface ProfileState {
    profile: ProfileType | null
    isLoading: Boolean
  }
}
