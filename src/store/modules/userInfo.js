
const state = {
  userInfo: {
    id: 20,
    nick_name: "15010626368",
    photo: null,
    role: 1,
    speciality: null,
    username: "15010626368"
  }
}

const mutations = {
  UPDATE_INFO(state, params) {
    state.info = params
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
