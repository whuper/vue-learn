<template>
  <div class="list">
    <h1>{{ msg }}</h1>
    <form novalidate>
		<p>
		<input type="text" name="name" v-model="userId" placeholder="请输入用户名">
		</p>   

			<p>
      <input type="passwd" name="passwd" v-model="passwd" >
		</p>  
		<p>
		<button type="button" class="btn" @click="doLogin" :disabled="!userId || !passwd" >登录</button>
		</p>
    
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
