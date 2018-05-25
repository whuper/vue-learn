<template>
  <div class="menu-links">
    <div class="text-right" v-show="!showToolBar"> <md-button class="expand-more" @click="showToolBar = true"> <md-icon>expand_more</md-icon> 
        </md-button>
        </div>

   <md-toolbar class="md-primary" v-show="showToolBar">
      <md-button class="md-icon-button" @click="showNavigation = true" v-show="userInfo.userName">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">  <md-icon v-show="!userInfo.userName" >sentiment_very_satisfied</md-icon> 
				{{ title}} </span>

   <div class="md-toolbar-section-end">
        <md-button @click="showToolBar = false"> <md-icon>expand_less</md-icon> 
        </md-button>
      </div> 

    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title"> <md-icon>account_box</md-icon> {{userInfo.userName}} </span>
      </md-toolbar>

      <md-list>
        <md-list-item>
					  <router-link to="/report"> 
						<md-button ><md-icon>chrome_reader_mode</md-icon> 
             预览周报 </md-button> 
						</router-link>
         
        </md-list-item> 

        <md-list-item>
				<router-link to="/">
				 <md-button >
          <md-icon>home</md-icon>
          周报主页</md-button> 
						</router-link>
          
        </md-list-item>

      <md-list-item>
				<router-link to="/resetPwd">
				 <md-button >
          <md-icon>security</md-icon>
           修改密码</md-button> 
						</router-link>          
        </md-list-item> 

<!-- 				<md-list-item>
				<router-link to="/login">
				 <md-button >
          <md-icon>arrow_right_alt</md-icon>
          登录</md-button> 
						</router-link>          
        </md-list-item> -->



				 </md-list>

				  <md-list>

				<md-subheader>其他</md-subheader>

        
				<md-list-item v-if="userInfo.role == 6">
        <router-link to="/user">
            <md-button class="md-raised" >
					 <md-icon>people</md-icon>	用户管理
          </md-button> 
        	</router-link>

        </md-list-item>

				<md-list-item v-if="userInfo.role == 6">
        <router-link to="/user">
            <md-button class="md-raised" >
					 <md-icon>list</md-icon>所有周报
          </md-button> 
        	</router-link>

        </md-list-item>

				  <md-list-item>
            <md-button class="md-raised" @click="logout" >
					 <md-icon>eject</md-icon>
						 <span>注销</span>
          </md-button> 
        </md-list-item>

      </md-list>
<!--
  <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title"> <md-icon>more_horiz</md-icon></span>
      </md-toolbar>

      <md-list class="md-double-line">
        <md-subheader>Phone</md-subheader>

        <md-list-item>
            <md-button class="md-raised" @click="logout" >
					 <md-icon>eject</md-icon>
						 <span>注销</span>
          </md-button> 
        </md-list-item>

      </md-list>
    </div>
		-->
    </md-drawer>


<!--     <md-toolbar>
      <h3 class="md-title" style="flex: 1">{{ title}}</h3>
  
    <md-menu md-size="small" md-align-trigger v-if="userInfo.userName && userInfo.userName.length" >
      <md-button md-menu-trigger> {{userInfo.userName}} </md-button>

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
					<!--<button v-if="userInfo.userName && userInfo.userName.length" @click="logout">退出</button>				
					<button v-else @click="login">登录</button>	-->

			
	</div>
</div>

	<!--
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
	<h3>当前登录用户{{userInfo.userName}} </h3>

	<router-link v-show="false" v-for="(link,index) in links" v-bind:key="index" v-bind:data-index="index" v-bind:to="link.path">
	  {{link.name}}
	  </router-link>
		-->

  </div>
</template>

<script>
import { mapActions,mapGetters,mapState} from 'vuex'
// import links from '@/router'

export default {
	 data () {
    return {
            showNavigation:false,
            showToolBar:true
    }
  },
  computed: {
    // mix the getters into the computed object
    ...mapGetters([
      'userInfo'
    ]),
		...mapState({
			title: state => state.common.title
    })
  },
created:function() {
	//this.links = links.options.routes;
		},
/*
mounted:function() {
					console.log('this.userInfo.userName',this.userInfo.userName);
	if(!this.userInfo.userName){
			this.logout();
	}	
		},
		*/
 methods: {                   
      ...mapActions([
        'updateinfo',
         'setTitle',
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
					this.delCookie('password');
					localStorage.removeItem('userInfo');

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
