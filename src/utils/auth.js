import axios from 'axios'

const instance = axios.create()
instance.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
instance.defaults.withCredentials = true
instance.defaults.timeout = 5 * 60 * 1000
instance.defaults.headers = {
  'Content-Type': 'application/json;charset=utf8'
}

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  !!token && (config.headers.Authorization = token)
  return config
}, err => Promise.reject(err))
