import { LoginAccount, RegisterAccount, VerifyEmailInput } from 'Models'
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
  register(params: RegisterAccount) {
    const url = '/auth/register'
    return axiosClient.post(url, params)
  },
  sendMail(params: any, token: string) {
    const url = `auth/send-mail`
    return axiosClient.post(url, params, setHeaders(token))
  },
  verifyEmail(params: VerifyEmailInput, token: string) {
    const url = `auth/check-verify`
    return axiosClient.post(url, params, setHeaders(token))
  }
}

export default authApi
