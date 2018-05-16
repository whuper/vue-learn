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
					
    <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="showSnackbar" :md-persistent="true">
		<span>{{bMsg}}</span>
      <md-button class="md-primary" @click="closebar">close</md-button>
    </md-snackbar>
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
			console.log('路由改变');
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
      'bMsg': state => state.report.bMsg
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
				console.log('## userInfo',this.userInfo);
				 //提交mutation到Store
				this.$store.commit('updateinfo_req',this.userInfo); 
			} else {			
				this.$router.push('/login');
			}
     
    },
		checkLogin(){
					//检查是否存在cookie
					if(!this.getCookie('userId') || !localStorage.getItem('userInfo') ){
						//如果没有登录状态则跳转到登录页
						console.log('###没有登录');
						this.$router.push('/login');
					}else{
						//否则跳转到登录后的页面
						//this.$router.push('/report');
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
