
const state = {
  loginDialogVisiable: false
}

const mutations = {
  CHANGE_STATE(state, boolean) {
    state.loginDialogVisiable = boolean
  }
}

const actions = {
  changeLoginDialogVisiable({ commit }, boolean) {
    commit('CHANGE_STATE', boolean)
  }
}

export default {
  state,
  mutations,
  actions
}
