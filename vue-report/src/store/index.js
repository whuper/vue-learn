import Vuex from 'vuex'
import Vue from 'vue'
//import cart from './cart'
//import products from './products'
import user from './user'
import report from './report'
import common from './common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
		user,
    report,
    common
  }
})
