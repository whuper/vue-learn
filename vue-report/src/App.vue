<template>
  <div id="app" class="page-container md-layout-column">
          <div class="header">
            <header-bar></header-bar>
          </div>
          <div class="page">
						  <transition name="slide">
								<router-view/>
							</transition>
          </div>
          </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'
export default {
	components: {
		HeaderBar
	},
	name: 'App',
  //监听路由检查登录
  watch:{
    "$route" : 'checkLogin'
  },
	mounted(){
    //组件开始挂载时获取用户信息
    this.getUserInfo();
  },

  //进入页面时
  created() {
    this.checkLogin();
  },				
	methods: {
		//请求用户的一些信息
    getUserInfo(){

      //发送http请求获取，这里写死作演示

			if(this.getCookie('userId')){
				this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
				console.log('## userInfo',this.userInfo);
				 //提交mutation到Store
				this.$store.commit('updateinfo_req',this.userInfo); 
			}
     
    },
		checkLogin(){
				console.log('### 路由变化');
					//检查是否存在session
					//cookie操作方法在源码里有或者参考网上的即可
					if(!this.getCookie('userId')){
						//如果没有登录状态则跳转到登录页
						console.log('###没有登录');
						this.$router.push('/login');
					}else{
						//否则跳转到登录后的页面
						//this.$router.push('/report');
					}
				}
}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

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
