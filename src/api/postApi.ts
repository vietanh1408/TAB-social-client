import { CommentPost, CreateOrEditPostInput, Pagination } from 'Models'
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
  create(data: CreateOrEditPostInput) {
    const url = `/posts`
    return axiosClient.post(url, data, setHeaders())
  },
  edit(data: CreateOrEditPostInput) {
    const url = `/posts/${data?.id}`
    return axiosClient.patch(url, data, setHeaders())
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
    const url = `/posts/${id}`
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
  },
  getPostsByProfileId(id: string, pagination?: Pagination) {
    let url = `/posts/profile/${id}`
    if(pagination?.pageIndex) {
      url += `?page=${pagination.pageIndex}`
    }
    if(pagination?.pageSize) {
      url += `&limit=${pagination.pageSize}`
    }
    return axiosClient.get(url, setHeaders())
  }
}

export default postApi
