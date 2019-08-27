
const state = {
  creatNote: 0,
  isApprenticeMaster: 0,
  solovedNote: 0,
  onlineStatus: 0,
  removeMasterChosed: 0
}

const mutations = {
  UPDATE_NOTE_STATUS(state) {
    state.creatNote++
  },
  UPDATE_MASTER_STATUS(state) {
    state.isApprenticeMaster++
  },
  UPDATE_SOLOVED_NOTE_STATUS(state) {
    state.solovedNote++
  },
  UPDATE_ONLINE_STATUS(state) {
    state.onlineStatus = 1
  },
  UPDATE_MASTER_CHOSED() {
    state.removeMasterChosed++
  }
}

const actions = {
  updateNoteStatus({ commit }) {
    commit('UPDATE_NOTE_STATUS')
  },
  updateMasterStatus({ commit }) {
    commit('UPDATE_MASTER_STATUS')
  },
  updateSolovedNoteStatus({ commit }) {
    commit('UPDATE_SOLOVED_NOTE_STATUS')
  },
  updateOnlineStatus({ commit }) {
    commit('UPDATE_ONLINE_STATUS')
  },
  updateMasterChosed({ commit }) {
    commit('UPDATE_MASTER_CHOSED')
  }
}

export default {
  state,
  mutations,
  actions
}
