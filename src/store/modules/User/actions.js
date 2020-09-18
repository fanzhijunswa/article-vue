import { getCurrentUser } from '@/api'

export default {
  getUserInfo ({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      try {
        const userInfo = await getCurrentUser()
        commit('setUserInfo', userInfo)
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }
}
