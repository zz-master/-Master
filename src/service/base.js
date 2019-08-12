import config from '../config.json'
import axios from 'axios'

class BaseService {
  apiGetCode(phoneNum) {
    return axios.get(`${config.host}/students/smscodes/${phoneNum}`)
  }
}

// 创建API实例
const base = new BaseService()

export default base
