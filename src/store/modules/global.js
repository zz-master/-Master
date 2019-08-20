
const state = {
  creatNote: 0,
  apprenticeMaster: 0,
  solovedNote: 0,
  onlineStatue: 0
}

const mutations = {
  UPDATE_NOTE_STATUS(state) {
    state.creatNote++
  },
  UPDATE_MASTER_STATUS(state) {
    state.apprenticeMaster++
  },
  UPDATE_SOLOVED_NOTE_STATUS(state) {
    state.solovedNote++
  },
  UPDATE_ONLINE_STATUS(state) {
    state.onlineStatue = 1
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
  updateonlineStatue({ commit }) {
    commit('UPDATE_ONLINE_STATUS')
  }
}

export default {
  state,
  mutations,
  actions
}
