
const state = {
	id:'',
	username:'wenhao2'
}

const actions = {
  updateinfo({commit, state}) {
		commit('updateinfo_req')
  }
}

const mutations = {
  updateinfo_req(state) {
    state.username += '#';
  }
}

const getters = {
  usernameNew (state, getters, rootState) {
   
  },
  username (state) {
    return state.username
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
