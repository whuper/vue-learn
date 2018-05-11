import Vuex from 'vuex'
import Vue from 'vue'
import cart from './cart'
import products from './products'
import user from './user'
import report from './report'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    products,
		user
  }
})