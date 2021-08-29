import queryString from 'query-string'
import axios from 'axios'
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:9001/api/',
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params)
})

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosClient
