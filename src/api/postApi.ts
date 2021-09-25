import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const postApi = {
  get() {
    const url = `/posts`
    return axiosClient.get(url, setHeaders())
  },
  create(data: any) {
    const url = `/posts/create`
    return axiosClient.post(url, data, setHeaders())
  }
}

export default postApi
