const state = {
	showSnackbar:false,
	title:'欢迎你的到来,请登录',
	bMsg:'',
	schedules:{
		tasks:[],
		extratTasks:[],
		plans:[]
	}
}

const actions = {
		setShowSnackbar({commit, state},sta){
			commit('updateSnackBar_req',sta)		
		},
		setTitle({commit, state},val){
			commit('setTitle_req',val)		
		},
		updateSchedules({commit, state},payload){
			console.log('schedules',payload);
			commit('updateSchedules_req',payload)		
		}
  
}

const mutations = {
	updateSnackBar_req(state,payload){
			if(payload){
				console.log(payload);
				state.bMsg = payload;	
				state.showSnackbar = true;	
			} else {
				state.showSnackbar = false;	
			}
			
	},
	setTitle_req(state,val){
			state.title = val;	
	},
	updateSchedules_req(state,payload){
			state.schedules = payload;	
	}

}

const getters = {
  /*showSnackbar(state, getters, rootState) {
			return state.showSnackbar
  },*/
	title(state, getters, rootState) {
			return state.title
  },
	schedules(state, getters, rootState) {
			return state.schedules
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
