<template>
  <div id="app" class="page-container md-layout-column ">
          <div class="header">
            <header-bar></header-bar>
          </div>
          <div class="page">
						  <transition name="slide">
								<router-view/>
							</transition>
          </div>

    <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="bMsg.show" :md-persistent="true">
		<span>{{bMsg.title}}</span>
      <md-button class="md-primary md-raised" @click="closebar">忽略</md-button>
    </md-snackbar>

    <md-dialog :md-active.sync="dialogAlert.active">
      <md-dialog-title>{{dialogAlert.title}}</md-dialog-title>
			<md-dialog-content>{{dialogAlert.content}}</md-dialog-content>
   <md-dialog-actions>
        <md-button class="md-raised" @click="onCancel" >{{dialogAlert.cancelText}}</md-button>
        <md-button class="md-primary md-raised md-dense" @click="dialogAlert.onConfirm" >{{dialogAlert.confirmText}}</md-button>
      </md-dialog-actions>
    </md-dialog>

 <md-progress-bar class="md-accent md-primary global" md-mode="indeterminate" v-if="loading"></md-progress-bar>

          </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'
import { mapActions,mapGetters,mapState} from 'vuex'
export default {
	components: {
		HeaderBar
	},
	name: 'App',
	data() {
    return {
      title:''
    }
  },
  //监听路由检查登录
  watch:{
    //"$route" : 'checkLogin'
    $route(){
     this.checkLogin();
    }
  },
	mounted(){
    //组件开始挂载时获取用户信息
		this.getUserInfo();
		
  },
  //进入页面时
  created() {
		this.checkLogin();
		this.setData();
  },	
	computed: {
    /*...mapGetters([
      'showSnackbar'
    ])
		*/
		//解决 Computed property ** was assigned to but it has no setter
		showSnackbar: {
			get: function () {
				return this.$store.state.report.showSnackbar
			},
			set: function () {
			}
		},	
		// 'showSnackbar': state => state.report.showSnackbar
		...mapState({
			'bMsg': state => state.common.bMsg,
			'loading':state => state.common.loading,
			'dialogAlert': state => state.common.dialogAlert
			})
			
  },
	methods: {
		...mapActions([
      'setShowSnackbar'
    ]),
		//请求用户的一些信息
    getUserInfo(){

      //发送http请求获取，这里写死作演示

			if(this.getCookie('userId')){
				this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

				 //提交mutation到Store
				this.$store.commit('updateinfo_req',this.userInfo); 
			} else {			
				this.$router.push('/login');
			}
     
		},
		setData(){
			var weekNumber = this.getWeekOfYear();
			console.log('weekNumber',weekNumber);
			
			this.$store.commit('updateWeekNumber_req',weekNumber); 
		},
		getWeekOfYear() {
      var today = new Date();
      var firstDay = new Date(today.getFullYear(),0, 1);
      var dayOfWeek = firstDay.getDay(); 
      var spendDay= 1;
      if (dayOfWeek !=0) {
        spendDay=7-dayOfWeek+1;
      }
      firstDay = new Date(today.getFullYear(),0, 1+spendDay);
      var d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
      var result =Math.ceil(d/7);
      return result+1;
    },
		onCancel:function(){
			this.$store.commit('dialogAlert_req');
		},
		checkLogin(){
					//检查是否存在cookie
					if(!this.getCookie('userId') || !localStorage.getItem('userInfo') ){
						//如果没有登录状态则跳转到登录页
				
						this.$router.push('/login');
					}else{
					
					let userInfo = JSON.parse(localStorage.getItem('userInfo'));				
					this.$store.commit('updateinfo_req',userInfo);
					}
				},
		closebar(){
				this.setShowSnackbar(false);
		
		}
}
}
</script>

<style>
/* transition animate */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}


.slide-enter-active {
  transition: all .3s ease;
}
.slide-leave-active {
  /* transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
}
.slide-enter, .slide-leave-active {
  transform: translateX(10px);
  opacity: 0;
}

</style>
