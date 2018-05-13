// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import 'normalize.css'

import util from './api/util'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/black-green-light.css' // This line here
import './assets/icon.css'
import css from './assets/layout.less';

Vue.use(util);

Vue.use(VueMaterial) 

Vue.config.productionTip = false

// 配置主题 -- 配置默认主题
/*Vue.material.registerTheme('default',{
  primary: 'blue',
  accent: 'red',
  background: 'white',
})
Vue.material.setCurrentTheme('default')*/

// 引入mockjs
//require('./api/mock.js')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
