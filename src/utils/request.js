import axios from 'axios'
import store from '@/store'
import Message from 'element-ui/packages/message'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: '10000'
})
// 请求拦截
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 成功执行
    return config
  },
  (error) => {
    // 失败执行
    return Promise.reject(error)
  }
)
// 响应拦截
service.interceptors.response.use(
  (response) => {
    // 判断是不是blob
    if (response.data instanceof Blob) return response.data
    const { data, message, success } = response.data
    if (success) {
      return data
    } else {
      Message({ type: 'error', message })
      return Promise.reject(new Error(message))
    }
  },
  async(error) => {
    if (error.response.status === 401) {
      Message({ type: 'warning', message: 'token超时了' })
      await store.dispatch('user/loginOut')
      router.push('/login')
      return Promise.reject(error)
    }
  }
)
export default service
