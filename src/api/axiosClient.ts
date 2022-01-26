import queryString from 'query-string'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:9001/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  },
  paramsSerializer: (params) => queryString.stringify(params)
})

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: AxiosRequestConfig) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosClient
