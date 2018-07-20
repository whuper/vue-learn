<template>
  <div class="list">
    <!--<h3 class="text-center">{{ msg }}</h3>-->
    <form novalidate class="md-layout" >
	  <md-card class="md-layout-item md-size-50 md-small-size-100 login-box">
			<md-card-header>
          <div class="md-title text-center">用户登录</div>
        </md-card-header>
		
        <md-card-content>
    <md-field>
      <label>请输入用户名(工号)</label>
      <md-input v-model="userId"></md-input>
    </md-field>


       <md-field>
      <label>密码</label>
      <md-input type="password" v-model="password"></md-input>
    </md-field>

        <md-button class="md-raised md-primary"  @click="doLogin" :disabled="!userId || !password" >登录</md-button>
          </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>

import { mapActions,mapGetters,mapState} from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Log on',
			isLoging: false,
      userId: '',
      password: ''
    }
  },
  created(){
    let $this = this;
    window.onkeydown = function(e){
      var key = e.keyCode;
      if(key == '13' && $this.userId && $this.password){    
          $this.doLogin();
      }

    }


  },
	computed: {
   /*...mapGetters([
      'showSnackbar'
    ]
		)*/
		...mapState([
      'showSnackbar'
			])
  },
  methods:{
	...mapActions([
      'setShowSnackbar'
    ]),
	doLogin: function (event) {
    // methods 里的方法中的 `this` 指 Vue 实例
		//console.log(this)
      // `event` 是原始 DOM 事件对象
	/*
      if (event) {
        alert(event.target.tagName)
      }
	  */
  //this.getData();
  this.$store.commit('updateSchedules_req',{})

  this.$store.commit('setLoading_req',true)  
  
	var data = this.$qs.stringify({
    userId: this.userId,
    password: this.password,
    encrypt:0
    });
	this.$axios.post('./index.php/user/login',
			data,
			).then(response => {
        if(response.data && response.data.userId){
          let expireHours = 24 * 30;
          this.setCookie('userId',response.data.userId, expireHours);
          this.setCookie('password',response.data.password, expireHours);

          //本地不再保存用户信息
					//localStorage.setItem('userInfo',JSON.stringify(response.data));

					//提交mutation到Store
					this.$store.commit('updateinfo_req',response.data); 
          this.setShowSnackbar();
          //登录成功后
					
					//this.setShowSnackbar({bMsg:'登录成功',millisecond:800});
					
					setTimeout(()=>{
             this.$router.push('/'); 
              this.$store.commit('setLoading_req',false);
						 //提交mutation到Store
							//this.$store.commit('updateSnackBar_req',
							},600)
         
        } else {
          this.$store.commit('setLoading_req',false);
          this.setShowSnackbar({bMsg:'无法登录 密码错误#01'});
        }
      }).catch( (error) => {
				this.setShowSnackbar({bMsg:'无法登录,服务器故障..'});
					console.log(error);
				 });
	//该函数 end
    }
	 
		 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
