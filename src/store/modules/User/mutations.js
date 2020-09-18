export default {
  setUserInfo (state, payload) {
    state.userInfo = payload
  },
  removeAll (state) {
    state.userInfo = {}
    localStorage.removeItem('article_token')
    localStorage.removeItem('article_refresh_token')
  }
}
