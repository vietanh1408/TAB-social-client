import { NotificationType } from 'Models'
import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const notificationApi = {
  get() {
    const url = `/notifications`
    return axiosClient.get(url, setHeaders())
  },
  create(data: NotificationType) {
    const url = `/notifications`
    return axiosClient.post(url, data, setHeaders())
  }
}

export default notificationApi
