import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const postApi = {
  get(token: any) {
    const url = `/posts`
    return axiosClient.get(url, setHeaders(token))
  },
  create(data: any, token: any) {
    const url = `/posts/create`
    return axiosClient.post(url, data, setHeaders(token))
  }
}

export default postApi
