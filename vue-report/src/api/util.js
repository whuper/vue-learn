import axios from 'axios'
axios.defaults.baseURL = 'http://localhost/simi/index.php';
/*var instance = axios.create({
  baseURL: 'http://localhost/simi/index.php/report',
  timeout: 1000
});*/

export default{
  install(Vue,options)
  {
    Vue.prototype.getData = function () {
      console.log('我是插件中的方法');
    },
		Vue.prototype.$axios = axios

  }
}
