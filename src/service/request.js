import axios from 'axios'
import qs from 'qs'
import { getCookie } from '../utils/tool.js'


/****** 创建axios实例 ******/
const http = axios.create({
  baseURL: '',  // api的base_url
  timeout: 2000
})


http.interceptors.request.use(
  config => {
    config.method === 'post'
      ? config.data = qs.stringify({ ...config.data })
      : config.params = { ...config.params }

    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['X-CSRFToken'] = getCookie('csrftoken')
    return config;
  }, error => {
    //请求错误处理
    console.warn('request', error)
    Promise.reject(error)
  })

http.interceptors.response.use(
  response => {
    //成功请求到数据
    let { data: { code, msg } } = response
    if (code !== 10000000 && code !== 1000000) {
      // 接口异常处理
      throw new Error(msg)
    }
    console.warn('[api][url]', response.config.url)
    console.warn('[api][code]', code)
    console.warn('[api][msg]', msg)
    return response
  },
  error => {  //响应错误处理
    console.warn('error', error)
  }
);
export default http;