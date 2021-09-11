import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const uploadApi = {
  upload(params: any, token: any) {
    const url = `/upload`
    return axiosClient.post(url, params, setHeaders(token))
  },
  removeUpload(params: any, token: any) {
    const url = `/remove-upload`
    return axiosClient.patch(url, params, setHeaders(token))
  }
}

export default uploadApi
