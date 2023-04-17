import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken()
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken() {
    state.token = null
    removeToken()
  }
}
const actions = {
  login(context, data) {
    console.log(data)
    login(...data)
    context.commit('setToken', '123456')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
