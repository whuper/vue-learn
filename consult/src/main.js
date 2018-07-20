// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'normalize.css'
import css from './assets/layout.less';
import util from './api/util';
import Loading from "./components/loading/index";
import VuejsDialog from "vuejs-dialog"

import toast from './components/toast/index'



// Tell Vue to install the plugin.
Vue.use(VuejsDialog)
Vue.use(Loading);
Vue.use(util);
Vue.use(toast)

Vue.config.productionTip = false

// 引入mockjs
//require('./api/mock.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
