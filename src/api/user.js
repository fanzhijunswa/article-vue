/**
 * 发送短信验证码
*/
import api from '@/utils/auth'

const BASE_URL = '/app/v1_0'

export const sendSms = mobile => {
  return api({ url: `${BASE_URL}/sms/codes/${mobile}` })
}
