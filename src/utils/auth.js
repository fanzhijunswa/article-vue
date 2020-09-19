import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import router from '@/router'

// 获取心 token的axios请求，和别的axios请求不一样，这个axios请求的请求头需要配置refresh_token
const refreshTokenReq = axios.create({ baseURL: 'http://ttapi.research.itcast.cn/' })

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
  store.commit('User/setUserInfo', {})
  localStorage.removeItem('article_token')
  if (!token || !refresh_token) {
    router.replace({ name: 'login', query: { redirect: router.currentRoute.fullPath } })
    return false
  }
  try {
    const { data: { data: { token } } } = await refreshTokenReq({
      method: 'PUT',
      url: '/app/v1_0/authorizations',
      headers: {
        Authorization: `Bearer ${refresh_token}`
      }
    })
    localStorage.setItem(token)
    return instance(err.config)
  } catch (e) {
    console.warn(e)
  }
}

const apiMiddleFunc = ({ url, method, data = {} }) => {
  return new Promise((resolve, reject) => {
    instance({
      url,
      method,
      [method === 'get' ? 'params' : 'data']: data
    }).then(resp => resolve(resp), e => reject(e))
  })
}

const api = ['get', 'post', 'delete', 'put'].reduce((prev, method) => {
  prev[method] = (url, data) => apiMiddleFunc({ url, method, data })
  return prev
}, {})

export default api
