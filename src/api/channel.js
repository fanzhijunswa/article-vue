import api from '@/utils/auth'

const BASE_URL = '/app/v1_0'

export const getAllChannels = () => api.get(`${BASE_URL}/channels`)
