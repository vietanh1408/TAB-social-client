import { NotificationType } from 'Models'
import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const notificationApi = {
  create(data: NotificationType) {
    const url = `/notification/notify`
    console.log('data,,', data)
    return axiosClient.post(url, data, setHeaders())
  }
}

export default notificationApi
