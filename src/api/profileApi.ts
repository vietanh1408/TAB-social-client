import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const profileApi = {
  getProfile(id: any) {
    const url = `/user/${id}`
    return axiosClient.get(url, setHeaders())
  },
  editProfile(id: any, data: any) {
    const url = `/user/edit/${id}`
    return axiosClient.put(url, { data }, setHeaders())
  },
  sendFriendRequest(id: string) {
    const url = `/user/send-friend-request`
    return axiosClient.post(url, { friendId: id }, setHeaders())
  }
}

export default profileApi
