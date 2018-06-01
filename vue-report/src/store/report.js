const state = {
	schedules:{
		tasks:[],
		extratTasks:[],
		plans:[]
	},
	isPosted:false,
	weekNumber:0
}

const actions = {
		updateSchedules({commit, state},payload){
			console.log('schedules',payload);
			commit('updateSchedules_req',payload)		
		}
  
}

const mutations = {
	updateSchedules_req(state,payload){
			state.schedules = payload;	
	},
	updatePostStatus_req(state,payload){
		state.isPosted = payload;	
	},
	updateWeekNumber_req(state,payload){
		state.weekNumber = payload;	
	}

}

const getters = {
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
