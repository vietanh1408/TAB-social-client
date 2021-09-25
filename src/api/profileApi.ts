import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const profileApi = {
  getProfile(id: any) {
    const url = `/user/${id}`
    return axiosClient.get(url, setHeaders())
  }
}

export default profileApi
