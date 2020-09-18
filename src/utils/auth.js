import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import router from '@/router'
import { refreshTokenReq } from '@/api'
const instance = axios.create()
instance.defaults.baseURL = 'http://ttapi.research.itcast.cn/'

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('article_token')
  !!token && (config.headers.Authorization = `Bearer ${token}`)
  return config
}, err => Promise.reject(err))

instance.interceptors.response.use(
  res => {
    return res?.data?.data ?? res
  },
  err => {
    const status = err?.response?.status ?? 0
    switch (status) {
      case 400: Toast.fail('客户端请求参数异常'); break
      case 401: noToken(err); break
      case 403: Toast.fail('没有权限操作'); break
      default: Toast.fail('服务端异常，请稍后重试')
    }
    return Promise.reject(err)
  }
)

async function noToken (err) {
  const [token, refresh_token] = [localStorage.getItem('article_token'), localStorage.getItem('article_refresh_token')]
  store.commit('User/removeAll')
  if (!token || !refresh_token) {
    router.push('/login')
    return false
  }
  try {
    const token = await refreshTokenReq(refresh_token)
    localStorage.setItem(token)
    return instance(err.config)
  } catch (e) {
    router.replace({ name: 'login', query: { redirect: router.currentRoute.fullPath } })
  }
}

export default ({ url, method = 'get', data = {} }) => {
  return new Promise((resolve, reject) => {
    instance({
      url,
      method,
      [method === 'get' ? 'params' : 'data']: data
    }).then(resp => resolve(resp), e => reject(e))
  })
}
