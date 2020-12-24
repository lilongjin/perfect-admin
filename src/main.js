import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import animated from 'animate.css'
import { routes } from './router/router.js'// 引入路由字典文件
import store from './store/store.js'

//使用模块
Vue.use(Vuex);
Vue.use(qs);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(animated)

// 设置模块
Vue.config.productionTip = false;

//全局设置axios，使用方法为:this.$axios
Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;

//时间过滤器
Vue.filter('formatDate', function (value, fmt) {
  let getDate = new Date(value)
  let o = {
    'M+': getDate.getMonth() + 1,
    'd+': getDate.getDate(),
    'h+': getDate.getHours(),
    'm+': getDate.getMinutes(),
    's+': getDate.getSeconds(),
    'q+': Math.floor((getDate.getMonth() + 3) / 3),
    'S': getDate.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
});
//全局使用格式
//{{时间戳 | formatDate('yyyy-MM-dd')}}   //年月日
//{{时间戳 | formatDate('yyyy-MM-dd hh:mm:ss')}}   //年月日时分秒


// 设置路由
const router = new VueRouter({
  routes,
  mode:"hash",
});

//重写路由push方法，解决相同路径push方法跳转报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import App from './App.vue'

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store,
  router,
})
