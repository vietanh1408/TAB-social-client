import { LoginAccount } from 'Models'
import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const authApi = {
  login(params: LoginAccount) {
    const url = '/auth/login'
    return axiosClient.post(url, params)
  },
  loadUser(token: string) {
    const url = '/auth'
    return axiosClient.get(url, setHeaders(token))
  },
  register(params: any) {
    const url = '/auth/register'
    return axiosClient.post(url, params)
  }
}

export default authApi
