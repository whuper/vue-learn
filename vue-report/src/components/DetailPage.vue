<template>
  <div class="detail">
    <h1>{{ msg }}</h1>
    <h2>detail</h2>
	  <p>
	    {{ $route.params.id }}
	  </p>

  </div>
</template>

<script>
export default {
  name: 'DetailPage',
  data () {
    return {
      msg: 'Welcome to DetailPage'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
