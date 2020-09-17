import axios from 'axios'

const instance = axios.create()
instance.defaults.baseURL = 'http://ttapi.research.itcast.cn/'

instance.interceptors.request.use(config => {
  // const token = localStorage.getItem('token')
  // !!token && (config.headers.Authorization = token)
  return config
}, err => Promise.reject(err))

instance.interceptors.response.use(
  res => {
    return res?.data?.data ?? res
  },
  err => Promise.reject(err)
)

export default ({ url, method = 'get', data = {} }) => {
  return new Promise((resolve, reject) => {
    instance({
      url,
      method,
      [method === 'get' ? 'params' : 'data']: data
    }).then(resp => resolve(resp), e => reject(e))
  })
}
