<template>
  <div id="app">
  <div class="header">
	<header-bar></header-bar>
  </div>
  <div class="page">
  	
    <router-view/>
  </div>
  

  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'
export default {
	components: {
		HeaderBar
	},
	name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
