declare module 'Models' {
  export interface AvatarType {
    publicId: any
    url: any
  }
  export interface BackgroundType {
    publicId: any
    url: any
  }
  export interface ProfileType {
    _id: string
    name: string
    email: string
    phone: string
    password: string
    avatar: AvatarType | undefined
    background: BackgroundType | undefined
    gender: Number
    friends: Array[string]
    followers: Array[string]
    followings: Array[string]
    description: string
    city: string
    from: string
    relationship: Number
    sendFriendRequests: Array[string]
    friendRequests: Array[string]
    blockUsers: Array[string]
    createdAt: Date
    isVerifiedMail: boolean
    verifyCode: string
    isFriend: boolean
  }

  export interface ProfileState {
    profile: ProfileType | null
    isLoading: boolean
  }
}
