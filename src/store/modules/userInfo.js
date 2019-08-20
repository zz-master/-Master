
const state = {
  userInfo: {
    id: 20,
    nick_name: "",
    photo: null,
    role: 1,
    speciality: null,
    username: ""
  }
}

const mutations = {
  UPDATE_INFO(state, params) {
    state.userInfo = Object.assign(state.userInfo, params)
    console.warn('UPDATE_INFO', params)
  }
}

const actions = {
  updateUserInfo({ commit }, params) {
    commit('UPDATE_INFO', params)
  }
}

const getters = {
  userId: state => state.userInfo.id,
  userName: state => state.userInfo.nick_name,
  userAvatar: state => {
    if (state.photo) {
      return state.userInfo.photo
    } else {
      return 'https://b-ssl.duitang.com/uploads/item/201711/10/20171110225150_ym2jw.jpeg'
    }
  },
  userRole: state => state.userInfo.role
}

export default {
  state,
  mutations,
  actions,
  getters
}
