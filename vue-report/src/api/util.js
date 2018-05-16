import axios from 'axios'
import qs from 'qs';
//axios.defaults.baseURL = 'http://localhost/simi/index.php';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/*var instance = axios.create({
  baseURL: 'http://localhost/simi/index.php/report',
  timeout: 1000
});*/
function setCookie(c_name, value, hours) {
				var exdate = new Date();　　　　
				exdate.setTime(exdate.getTime() + Number(hours) * 3600 * 1000);　　　
				document.cookie = c_name + "=" + escape(value) + ((hours == null) ? "" : ";expires=" + exdate.toGMTString());
			}

	//获取cookie、
		function getCookie(name) {
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if (arr = document.cookie.match(reg))
				return (arr[2]);
			else
				return null;
		}
		//删除cookie
function delCookie(name){
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var cval = getCookie(name);
				if (cval != null)
					document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
			}

export default{
  install(Vue,options)
  {
    Vue.prototype.getData = function () {
      console.log('我是插件中的方法');
    },
		Vue.prototype.$axios = axios;
		Vue.prototype.$qs = qs;

		Vue.prototype.setCookie = setCookie;

	
		Vue.prototype.getCookie = getCookie;

		Vue.prototype.delCookie = delCookie;

			}
}
