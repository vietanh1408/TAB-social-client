declare module 'Models' {
  export interface SearchInput {
    keyword?: string
    type?: string
    pageSize?: number
    pageIndex?: number
  }

  export interface SearchResult {
    users: UserType[]
    posts: PostType[]
    totalUser: number
    totalPost: number
  }
}
