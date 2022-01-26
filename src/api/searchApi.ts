import formatString from 'extensions/string'
import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const searchApi = {
  search(input: any) {
    let url = `/search`

    if (input.keyword) {
      url += `?keyword=${formatString.removeTrim(input.keyword)}`
    }
    return axiosClient.get(url, setHeaders())
  }
}

export default searchApi
