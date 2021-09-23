import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const uploadApi = {
  upload(data: any, token: any) {
    const url = `/upload`
    return axiosClient.post(url, data, setHeaders(token))
  },
  removeUpload(data: any, token: any) {
    const url = `/remove-upload`
    return axiosClient.patch(url, data, setHeaders(token))
  }
}

export default uploadApi
