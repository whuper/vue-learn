<template>
  <div class="menu-links">
    <router-link to="/">Home</router-link>
    <router-link to="/list">List ({{ cartCount }})</router-link>
    <router-link to="/News">News</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    // mix the getters into the computed object
    ...mapGetters([
      'cartCount'

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
