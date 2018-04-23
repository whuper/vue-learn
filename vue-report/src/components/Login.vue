<template>
  <div class="list">
    <h1>{{ msg }}</h1>
    <form action="Login_submit" method="get" accept-charset="utf-8">
		<p>
		<input type="text" name="name" value="" placeholder="请输入用户名">
		</p>   

			<p>
		<input type="passwd" name="passwd" value="">
		</p>  
    
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to login'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
