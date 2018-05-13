<template>
  <div class="list">
    <h3>{{ msg }}</h3>
    <form novalidate class="md-layout" >
	  <md-card class="md-layout-item md-size-50 md-small-size-100 login-box">
        <md-card-content>
    <md-field>
      <label>请输入用户名</label>
      <md-input v-model="userId"></md-input>
    </md-field>


       <md-field>
      <label>密码</label>
      <md-input v-model="passwd"></md-input>
    </md-field>

        <md-button class="md-raised md-primary" @click="doLogin" :disabled="!userId || !passwd" >登录</md-button>
          </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import Loading from './Loading.vue'
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to login',
			isLoging: false,
      userId: '0147',
      passwd: '123456'
    }
  },
  methods:{
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
	var data = this.$qs.stringify({
    userId: this.userId,
    passWord: this.passwd  
    });
	this.$axios.post('/index.php/user/login',
			data,
			).then(response => {
        if(response.data && response.data.userid){
          let expireDays = 1000 * 60 * 60 * 24 * 30;
          this.setCookie('userId',response.data.userid, expireDays);
          this.setCookie('passWord',response.data.password, expireDays);

					localStorage.setItem('userInfo',JSON.stringify(response.data));

				//提交mutation到Store
				this.$store.commit('updateinfo_req',response.data); 
          //登录成功后
					console.log('### 登录成功');
					setTimeout(()=>{
						 this.$router.push('/'); 
							},500)
         
        }
      }).catch(function (error) {
					console.log(error);
				 });
    }
	 
		 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
