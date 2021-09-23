import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const uploadApi = {
  upload(data: any) {
    const url = `/upload`
    return axiosClient.post(url, data, setHeaders())
  },
  removeUpload(data: any) {
    const url = `/remove-upload`
    return axiosClient.patch(url, data, setHeaders())
  }
}

export default uploadApi
