import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const profileApi = {
  getProfile(id: string) {
    const url = `/users/${id}`
    return axiosClient.get(url, setHeaders())
  }
}

export default profileApi
