import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const profileApi = {
  getProfile(id: any, token: any) {
    const url = `/user/${id}`
    return axiosClient.get(url, setHeaders(token))
  },
  editProfile(id: any, data: any, token: any) {
    const url = `/user/edit/${id}`
    return axiosClient.put(url, { data }, setHeaders(token))
  }
}

export default profileApi
