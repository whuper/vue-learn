import axios from 'axios'

export default{
  install(Vue,options)
  {
    Vue.prototype.getData = function () {
      console.log('我是插件中的方法');
    },
		Vue.prototype.$axios = axios

  }
}
