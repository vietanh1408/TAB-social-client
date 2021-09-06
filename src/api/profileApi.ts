import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const profileApi = {
  getProfile(id: any, token: any) {
    const url = `/user/${id}`
    return axiosClient.get(url, setHeaders(token))
  }
}

export default profileApi
