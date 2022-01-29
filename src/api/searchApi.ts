import formatString from 'extensions/string'
import { SearchInput } from 'Models'
import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const searchApi = {
  search(input: SearchInput) {
    let url = `/search`

    if (input.keyword) {
      url += `?keyword=${formatString.removeTrim(input.keyword)}`
    }

    if (input.pageSize) {
      url += `&limit=${Number(input.pageSize)}`
    }

    if (input.pageIndex) {
      url += `&page=${Number(input.pageIndex)}`
    }

    if (input.type) {
      url += `&type=${input.type}`
    }

    return axiosClient.get(url, setHeaders())
  }
}

export default searchApi
