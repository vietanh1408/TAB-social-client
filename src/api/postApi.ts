import { CommentPost, CreatePostInput, Pagination } from 'Models'
import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const postApi = {
  get(pagination: Pagination | undefined) {
    let url = `/posts`
    if (pagination?.pageIndex) {
      url += `?page=${pagination.pageIndex}`
    }
    if (pagination?.pageSize) {
      url += `&limit=${pagination.pageSize}`
    }
    return axiosClient.get(url, setHeaders())
  },
  create(data: CreatePostInput) {
    const url = `/posts/create`
    return axiosClient.post(url, data, setHeaders())
  },
  like(id: string) {
    const url = `/posts/like`
    return axiosClient.post(url, { postId: id }, setHeaders())
  },
  unlike(id: string) {
    const url = `/posts/dislike`
    return axiosClient.post(url, { postId: id }, setHeaders())
  },
  delete(id: string) {
    const url = `/posts/delete/${id}`
    return axiosClient.delete(url, setHeaders())
  },
  comment(data: CommentPost) {
    const url = `/posts/comment`
    return axiosClient.post(url, data, setHeaders())
  },
  getComment(id: string, pagination?: Pagination) {
    let url = `/posts/comments/${id}`
    if (pagination?.pageIndex) {
      url += `?page=${pagination.pageIndex}`
    }
    if (pagination?.pageSize) {
      url += `&limit=${pagination.pageSize}`
    }
    return axiosClient.get(url, setHeaders())
  }
}

export default postApi
