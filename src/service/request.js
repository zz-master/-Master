import axios from 'axios'
import qs from 'qs'

/****** 创建axios实例 ******/
const service = axios.create({
  baseURL: process.env.BASE_URL,  // api的base_url
  timeout: 2000
})


service.interceptors.request.use(
  config => {
    config.method === 'post'
      ? config.data = qs.stringify({ ...config.data })
      : config.params = { ...config.params }

    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config;
  }, error => {
    //请求错误处理
    console.warn('request', error)
    Promise.reject(error)
  })

service.interceptors.response.use(
  response => {
    //成功请求到数据
    let { data: { code } } = response
    if (code !== 100000) {

    }
    return response
  },
  error => {  //响应错误处理
    console.warn('error', error)
  }
);
export default service;