import { CommentPost, CreatePostInput } from 'Models'
import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const postApi = {
  get() {
    const url = `/posts`
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
  }
}

export default postApi
