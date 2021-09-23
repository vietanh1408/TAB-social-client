import {
  LoginAccount,
  LoginGoogle,
  RegisterAccount,
  VerifyEmailInput
} from 'Models'
import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const authApi = {
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
  }
}

export default authApi
