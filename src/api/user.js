/**
 * 发送短信验证码
*/
import api from '@/utils/auth'

const BASE_URL = '/app/v1_0'

export const sendSms = mobile => {
  return api({ url: `${BASE_URL}/sms/codes/${mobile}` })
}

/**
 * 登录/注册
 */
export const login = data => {
  return api({
    method: 'post',
    url: `${BASE_URL}/authorizations`,
    data
  })
}
