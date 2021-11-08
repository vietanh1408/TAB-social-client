import { Pagination } from 'Models'
import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const friendApi = {
  getAllFriend() {
    const url = `/friends`
    return axiosClient.get(url, setHeaders())
  },
  getRequests(pagination: Pagination | undefined) {
    let url = `/friends/requests`
    if (pagination?.pageIndex) {
      url += `?page=${pagination.pageIndex}`
    }
    if (pagination?.pageSize) {
      url += `&limit=${pagination.pageSize}`
    }
    return axiosClient.get(url, setHeaders())
  }
}

export default friendApi
