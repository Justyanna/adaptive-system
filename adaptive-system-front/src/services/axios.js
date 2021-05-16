import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    return config
  },
  error => {
    Promise.reject(error)
  }
)

export default axiosInstance
