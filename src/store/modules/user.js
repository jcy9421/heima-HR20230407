import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken() {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}
const actions = {
  async login(context, data) {
    const token = await login(data)
    context.commit('setToken', token)
  },
  async getUserInfo(context, data) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
