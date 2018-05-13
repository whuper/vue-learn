<template>
  <div class="menu-links">

   <md-toolbar class="md-primary" >
      <md-button class="md-icon-button" @click="showNavigation = true" v-show="userInfo.username">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">  <md-icon v-show="!userInfo.username" >sentiment_very_satisfied</md-icon> {{ userInfo.username? title :'欢迎你的到来'}} </span>

  <!--     <div class="md-toolbar-section-end">
        <md-button @click="showSidepanel = true">Favorites</md-button>
      </div> -->
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title"> {{userInfo.username}} </span>
      </md-toolbar>

      <md-list>
        <md-list-item>
         
           <md-button ><md-icon>move_to_inbox</md-icon> 预览
           </md-button> 
        </md-list-item> 

        <md-list-item>
       
          <md-button @click="logout" >
          <md-icon>send</md-icon>
          注销</md-button> 
          
        </md-list-item>

        <md-list-item>
   <md-button >
          <md-icon>home</md-icon>
          主页</md-button> 
          
        </md-list-item>
        
<!--         <md-list-item>
     <md-icon>error</md-icon>
        <span class="md-list-item-text">管理员</span> 

        </md-list-item> -->
      </md-list>

  <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">Full</span>
      </md-toolbar>

      <md-list class="md-double-line">
        <md-subheader>Phone</md-subheader>

        <md-list-item>
          <md-icon class="md-primary">phone</md-icon>

          <div class="md-list-item-text">
            <span>(650) 555-1234</span>
            <span>Mobile</span>
          </div>

          <md-button class="md-icon-button md-list-action">
            <md-icon>sms</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item class="md-inset">
          <div class="md-list-item-text">
            <span>(650) 555-1234</span>
            <span>Mobile</span>
          </div>

          <md-button class="md-icon-button md-list-action">
            <md-icon>sms</md-icon>
          </md-button>
        </md-list-item>

        <md-divider></md-divider>
        <md-subheader>Email</md-subheader>

        <md-list-item>
          <md-icon class="md-primary">email</md-icon>

          <div class="md-list-item-text">
            <span>aliconnors@example.com</span>
            <span>Personal</span>
          </div>
        </md-list-item>

        <md-list-item class="md-inset">
          <div class="md-list-item-text">
            <span>ali_connors@example.com</span>
            <span>Work</span>
          </div>
        </md-list-item>
      </md-list>
    </div>
    </md-drawer>


<!--     <md-toolbar>
      <h3 class="md-title" style="flex: 1">{{ title}}</h3>
  
    <md-menu md-size="small" md-align-trigger v-if="userInfo.username && userInfo.username.length" >
      <md-button md-menu-trigger> {{userInfo.username}} </md-button>

      <md-menu-content>
              <md-menu-item> <md-button>预览 </md-button> </md-menu-item>
        <md-menu-item > <md-button @click="logout" >注销 </md-button> </md-menu-item>
        <md-menu-item>My Item 2</md-menu-item>
        <md-menu-item>My Item 3</md-menu-item>
      </md-menu-content>
    </md-menu>

      <md-button v-else @click="login" class="md-icon-button">
              请登录
              </md-button>

    </md-toolbar> -->
		<div class="toolbar clearfix">
					<div class="user ">
						<span class="info"> </span>			
					<!--<button v-if="userInfo.username && userInfo.username.length" @click="logout">退出</button>				
					<button v-else @click="login">登录</button>	-->

			
	</div>
</div>

 <md-button>
    <router-link to="/">Home</router-link>
 </md-button>

 <md-button>
    <router-link to="/index">index ({{ cartCount }})</router-link>
 </md-button>
 <md-button>
    <router-link to="/login">login</router-link>
 </md-button>
 <md-button>
    <router-link to="/report">report</router-link>
 </md-button>
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
            title:'工作周报',
            showNavigation:false
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
