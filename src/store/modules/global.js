
const state = {
  creatNote: 0,
  apprenticeMaster: 0
}

const mutations = {
  UPDATE_NOTE_STATUS(state) {
    state.creatNote++
  },
  UPDATE_MASTER_STATUS(state) {
    state.apprenticeMaster++
  }
}

const actions = {
  updateNoteStatus({ commit }) {
    commit('UPDATE_NOTE_STATUS')
  },
  updateMasterStatus({ commit }) {
    commit('UPDATE_MASTER_STATUS')
  }
}

export default {
  state,
  mutations,
  actions
}
