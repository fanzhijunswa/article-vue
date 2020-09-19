import api from '@/utils/auth'

// const BASE_URL = '/app/v1_0'

export const getArticles = params => api.get('/app/v1_1/articles', params)
