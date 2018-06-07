const state = {
	bMsg:{show:false},
	loading:false,
	title:'欢迎,请登录',
	dialogAlert:{
		active:false,
		onConfirm:function(){}
	},
	showToolBar:true,
	timeOut:null
}

const actions = {
		setShowSnackbar({commit, state},sta){
			commit('updateSnackBar_req',sta)		
		},
		setTitle({commit, state},val){
			commit('setTitle_req',val)		
		},
		dialogAlert({commit, state},payload){
			console.log('dialogAlert',payload);
			commit('dialogAlert_req',payload)		
		},
		setShowToolBar({commit, state},payload){		
			commit('updateShowToolBar_req',payload)		
		}
  
}

const mutations = {
	dialogAlert_req(state,payload){
			if(payload && payload.active){
				state.dialogAlert = Object.assign(state.dialogAlert,payload);
			} else {
				state.dialogAlert = {
					active:false,
					onConfirm:function(){}
				};	
			}
			
	},
	setTitle_req(state,val){
			state.title = val;	
	},
	setLoading_req(state,val){
		state.loading = val;	
	},
	updateShowToolBar_req(state,payload){
		state.showToolBar = payload;	
	},
	updateSnackBar_req(state,payload){
		if(payload){
			state.bMsg.title = payload.bMsg;
			state.bMsg.show = true;

			clearTimeout(state.timeOut);

			if(payload.millisecond){
			state.timeOut = setTimeout(() => {
					state.bMsg.show = false;	
				},payload.millisecond);
			}

		} else {
			state.bMsg.show = false;
		}
			

	}

}

const getters = {
	title(state, getters, rootState) {
			return state.title
  },
  dialogAlert(state, getters, rootState) {
			return state.dialogAlert
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
