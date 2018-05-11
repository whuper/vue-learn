<template>
  <div class="menu-links">
		<div class="toolbar clearfix">
					<div class="user ">
						<span class="info"> {{userInfo.username}}</span>			
					<button v-if="userInfo.username && userInfo.username.length" @click="logout">退出</button>	
			
					<button v-else @click="login">登录</button>	
			
	</div>
</div>

    <router-link to="/">Home</router-link>
    <router-link to="/index">index ({{ cartCount }})</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/report">report</router-link>
		<!--<h3>当前登录用户{{userInfo.username}} </h3>-->
	<p v-show="false">
	<button @click="updateinfo">更新</button>	
	购物袋 {{cartCount}}
	</p>

	<router-link v-show="false" v-for="(link,index) in links" v-bind:key="index" v-bind:data-index="index" v-bind:to="link.path">
	  {{link.name}}
	  </router-link>

  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'

import links from '@/router'

export default {
	 data () {
    return {
    }
  },
  computed: {
    // mix the getters into the computed object
    ...mapGetters([
      'cartCount',
      'userInfo'
    ])
  },
created:function() {
	this.links = links.options.routes;
		},
 methods: {
      ...mapActions([
        'updateinfo',
      ]),
			login(){
				this.$router.push('/login');
			},
			logout(){
					//删除cookie并跳到登录页
					this.isLogouting = true;
					//请求后端，比如logout.php
					// this.$http.post('eaxmple.com/logout.php')...
					//成功后删除cookie
					this.delCookie('userId');
					this.delCookie('passWord');
					localStorage.setItem('userInfo',null);

					//提交mutation到Store
					this.$store.commit('updateinfo_req',{}); 
					//重置loding状态
					this.isLogouting = false;

					//跳转到登录页
					this.$router.push('/login/');
				}
    }
}
</script>

<style>
.menu-links a {
  display: inline-block;
  text-decoration: none;
  color: #555;
  margin-right: 30px;
}
.toolbar .user {
float:right;
width:200px;
}
.user .info {
display:inline-block;
}
</style>
