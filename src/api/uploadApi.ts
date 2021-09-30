import { DataRemoveUpload, DataUpload } from 'Models'
import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const uploadApi = {
  upload(data: DataUpload) {
    const url = `/upload`
    return axiosClient.post(url, data, setHeaders())
  },
  removeUpload(data: DataRemoveUpload) {
    const url = `/remove-upload`
    return axiosClient.patch(url, data, setHeaders())
  }
}

export default uploadApi
