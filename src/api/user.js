
import api from '@/utils/auth'

const BASE_URL = '/app/v1_0'

/**
 * 发送短信验证码
*/
export const sendSms = mobile => api.get(`${BASE_URL}/sms/codes/${mobile}`)

/**
 * 登录/注册
 */
export const login = data => api.post(`${BASE_URL}/authorizations`, data)

/**
 * 获取用户信息
 */
export const getCurrentUser = () => api.get(`${BASE_URL}/user`)

/**
 * 获取个人资料
 */
export const getUserProfile = () => api.get(`${BASE_URL}/user/profile`)
