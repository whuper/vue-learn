<template>
  <div class="menu-links">
	  <!--
    <router-link to="/">Home</router-link>
    <router-link to="/list">List ({{ cartCount }})</router-link>
    <router-link to="/News">News</router-link>
	-->
		<h3>当前登录用户{{username}} 购物袋 {{cartCount}}</h3>
	<p>
	<button @click="updateinfo">更新</button>	
	</p>
	<router-link v-for="(link,index) in links" v-bind:key="index" v-bind:data-index="index" v-bind:to="link.path">
	  {{link.name}}
	  </router-link>
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'

import links from '@/router'

export default {
  computed: {
    // mix the getters into the computed object
    ...mapGetters([
      'cartCount',
      'username'
    ])
  },
created:function() {
	this.links = links.options.routes;
		},
 methods: {
      ...mapActions([
        'updateinfo'
      ])
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
</style>
