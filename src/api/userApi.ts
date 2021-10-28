import {
  LoginAccount,
  LoginGoogle,
  RegisterAccount,
  VerifyEmailInput
} from 'Models'
import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const userApi = {
  login(params: LoginAccount) {
    const url = '/auth/login'
    return axiosClient.post(url, params)
  },
  register(params: RegisterAccount) {
    const url = '/auth/register'
    return axiosClient.post(url, params)
  },
  verifyEmail(params: VerifyEmailInput) {
    const url = `auth/check-verify`
    return axiosClient.post(url, params, setHeaders())
  },
  loginGoogle(params: LoginGoogle) {
    const url = `/auth/google-login`
    return axiosClient.post(url, params)
  },
  editProfile(id: string, data: any) {
    const url = `/user/${id}`
    return axiosClient.put(url, { data }, setHeaders())
  },
  sendFriendRequest(id: string) {
    const url = `/user/send-friend-request`
    return axiosClient.post(url, { friendId: id }, setHeaders())
  },
  cancelSendFriendRequest(id: string | undefined) {
    const url = `/user/cancel-send-friend-request`
    return axiosClient.post(url, { friendId: id }, setHeaders())
  },
  acceptFriendRequest(id: string) {
    const url = `/user/accept-friend-request`
    return axiosClient.put(url, { friendId: id }, setHeaders())
  },
  unFriend(id: string) {
    const url = `/user/unfriend`
    return axiosClient.put(url, { friendId: id }, setHeaders())
  }
}

export default userApi
