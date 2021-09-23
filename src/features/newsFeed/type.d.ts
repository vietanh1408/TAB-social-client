declare module 'Models' {
  export interface ImageType {
    publicId: string
    url: string
  }

  export interface CreatePostInput {
    description: string
    image?: ImageType
  }

  export interface UserPostType {
    avatar: ImageType
    name: string
    _id: string
  }

  export interface PostType {
    comments: Array
    likes: Array
    description: string | undefined
    image: ImageType | undefined
    user: UserPostType
    createdAt: Date
  }
}
