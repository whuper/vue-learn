// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
//import 'normalize.css'

import util from './api/util'

import VueMaterial from 'vue-material'
//import {MdButton, MdCard,MdIcon,MdToolbar,MdTooltip,MdLayout,MdSnackbar,MdDrawer,MdField,MdInput,MdSelect,MdProgress,MdTable,MdList,MdMenu } from 'vue-material/dist/components'
//import { MdButton, MdContent, MdTabs} from 'vue-material/dist/components'

import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/black-green-light.css' // This line here
//import 'vue-material/dist/theme/default.css'
import './assets/icon.css'
import css from './assets/layout.less';

Vue.use(util);

Vue.use(VueMaterial) 
/*
Vue.use(MdButton)
Vue.use(MdCard)
Vue.use(MdToolbar)
Vue.use(MdTooltip)
Vue.use(MdSubheader)
Vue.use(MdSnackbar)
Vue.use(MdDrawer)
Vue.use(MdField)
Vue.use(MdInput)
Vue.use(MdSelect)
Vue.use(MdProgress)
Vue.use(MDtable)
*/
	//
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

window.EventBus = new Vue();  // 声明一个独立的空Vue公用实例，用来触发通讯的事件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
