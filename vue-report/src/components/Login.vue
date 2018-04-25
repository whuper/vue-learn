<template>
  <div class="list">
    <h1>{{ msg }}</h1>
    <form novalidate>
		<p>
		<input type="text" name="name" value="" placeholder="请输入用户名">
		</p>   

			<p>
		<input type="passwd" name="passwd" value="">
		</p>  
		<p>
		<button class="btn" @click="doLogin">登录</button>
		</p>
    
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to login'
    }
  },
  methods:{
	doLogin: function (event) {
    // methods 里的方法中的 `this` 指 Vue 实例
		console.log(this)
      // `event` 是原始 DOM 事件对象
	/*
      if (event) {
        alert(event.target.tagName)
      }
	  */
	//this.getData();
	this.$axios.get('/login').then(res => {
        console.log(res.data);
      })
    }
	 
		 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
