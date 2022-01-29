declare module 'Models' {
  export interface ImageType {
    publicId: string
    url: string
  }

  export interface CreateOrEditPostInput {
    id?: string
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
    isYour: boolean
  }

  export interface CommentPost {
    post?: PostType
    postId: string
    authorId?: string
    comment: string
  }

  export interface Pagination {
    pageIndex?: number | string
    pageSize?: number | string
  }

  export interface CommentType {
    id: string
    user: UserType | null
    createdAt: Date
    content: string
  }
}
