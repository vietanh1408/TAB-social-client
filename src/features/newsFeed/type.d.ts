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
    _id: string
    comments: any[]
    commentLength: number
    likes: string[]
    description: string
    image: ImageType
    user: UserPostType
    createdAt: Date
  }

  export interface CommentPost {
    post?: PostType
    postId: string
    authorId?: string
    comment: string
  }
}
