import axios from 'axios'
import { getCookie } from '../utils/tool.js'
import qs from 'qs'

class MasterService {

  // 获取鉴权信息
  getAuthorization() {
    return {
      'X-CSRFToken': getCookie('csrftoken'),
      'content-type': 'application/x-www-form-urlencoded'
    }
  }

  // 格式化数据
  postInitData(params) {
    return qs.stringify(params)
  }

  // 获取验证码
  apiGetCode(phone) {
    let params = { username: phone }
    return axios.post(`/api/users/user/sms/send/`, this.postInitData(params))
  }

  // 用户登录
  apiUserLogin(phone, code) {
    let params = {
      username: phone,
      smscode: code
    }
    return axios.post(`/api/users/user/login/`, this.postInitData(params))
  }

  // 获取自己师傅列表
  apiGetSelfMasterList() {
    return axios.get(`/api/users/user/my/master/`,
      {
        headers: this.getAuthorization()
      }
    )
  }

  // 获取全部师傅列表
  apiGetAllMasterList() {
    return axios.get(`/api/users/language/master/list/`,
      {
        headers: this.getAuthorization()
      }
    )
  }

  // 拜师
  apiApprenticeMaster(master_id) {
    let params = {
      master_id: master_id
    }
    return axios.post(`/api/users/user/apprentice/master/`, this.postInitData(params), {
      headers: this.getAuthorization()
    })
  }

  // 创建帖子
  apiCreatNote(params) {
    return axios.post(`/api/notes/note/create/`, this.postInitData(params), {
      headers: this.getAuthorization()
    })
  }

  // 获取自己帖子列表
  apiSelfNoteList() {
    return axios.get(`/api/notes/note/list/`, {
      headers: this.getAuthorization()
    })
  }

  // 帖子详情
  apiNoteDetail(pk) {
    return axios.get(`/api/notes/note/detail/${pk}/`, {
      headers: this.getAuthorization()
    })
  }

  // 解决问题
  apiSolveNote(note_id) {
    let params = {
      note_id: note_id,
      status: 3
    }
    return axios.post(`/api/notes/note/update/`, this.postInitData(params), {
      headers: this.getAuthorization()
    })
  }

  // 删除问题
  apiDelNote(pk) {
    return axios.post(`/api/notes/note/remove/${pk}/`, {
      headers: this.getAuthorization()
    })
  }
}

// 创建API实例
const masterService = new MasterService()

export default masterService
