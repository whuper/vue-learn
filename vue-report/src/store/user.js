
const state = {
	id:'',
	userInfo:{
		username:''
	}
}

const actions = {
  updateinfo({commit, state}) {
		commit('updateinfo_req')
  },
	login({commit, state}) {
		commit('login_req')
  },
	logout({commit, state}) {
		commit('logout_req')
  }
}

const mutations = {
  updateinfo_req(state,payload) {
    state.userInfo = payload;
  },
	login_req(){
		console.log('login_req');
	},
	logout_req(){
		console.log('logout_req');
	}
}

const getters = {
  userInfo (state,getters, rootState) {
    return state.userInfo
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
