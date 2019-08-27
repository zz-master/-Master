import axios from 'axios'
import { getCookie } from '../utils/tool.js'
import service from './request'

class MasterService {

  // 设置header信息
  setHeader() {
    return {
      'HTTP_COOKIE': `csrftoken=${getCookie('csrftoken')};sessionid=${getCookie('sessionid')}`
    }
  }

  // 获取验证码
  apiGetCode(phone) {
    let data = { username: phone }
    return service({
      url: '/api/user/sms/send/',
      method: 'post',
      data
    })
  }

  // 用户登录
  apiUserLogin(phone, code) {
    let data = {
      username: phone,
      smscode: code
    }
    return service({
      url: '/api/user/login/',
      method: 'post',
      data
    })
  }

  // 获取当前用户信息
  apiGetUserInfo() {
    return service({
      url: '/api/user/retrieve/',
      method: 'get',
      headers: this.setHeader()
    })
  }

  // 获取自己师傅列表
  apiGetSelfMasterList() {
    return service({
      url: '/api/user/my/master/',
      method: 'get'
    })
  }

  // 获取全部师傅列表
  apiGetAllMasterList() {
    return service({
      url: '/api/user/language/master/list/',
      method: 'get'
    })
  }

  // 拜师
  apiApprenticeMaster(master_id) {
    let data = {
      master_id: master_id
    }
    return service({
      url: '/api/user/apprentice/master/',
      method: 'post',
      data
    })
  }

  // 创建帖子
  apiCreatNote(data) {
    return service({
      url: '/api/note/create/',
      method: 'post',
      data
    })
  }

  // 获取自己帖子列表
  apiSelfNoteList() {
    return service({
      url: '/api/note/list/',
      method: 'get'
    })
  }

  // 帖子详情
  apiNoteDetail(pk) {
    return service({
      url: `/api/note/detail/${pk}/`,
      method: 'get'
    })
  }

  // 解决问题
  apiSolveNote(note_id) {
    let data = {
      note_id: note_id,
      status: 3
    }
    return service({
      url: `/api/note/update/`,
      method: 'post',
      data
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
