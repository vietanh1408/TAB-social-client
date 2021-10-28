import { NotificationType } from 'Models'
import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const notificationApi = {
  get() {
    const url = `/notification`
    return axiosClient.get(url, setHeaders())
  },
  create(data: NotificationType) {
    const url = `/notification`
    return axiosClient.post(url, data, setHeaders())
  }
}

export default notificationApi
