// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from "vue-axios"
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import {Icon, Upload} from "view-design";
import 'element-ui/lib/theme-chalk/index.css'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(VueCookies)
Vue.component('Upload', Upload)
Vue.component('Icon', Icon)

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8081/mall/'

var store = new Vuex.Store({
  state: {
    cartNum: 0
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  data: {
    url: './assets/iphone.png'
  },
  store
})
