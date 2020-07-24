import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from "axios";
import global_ from './Global'
import 'element-ui/lib/theme-chalk/display.css';
import store from './store'
Vue.config.productionTip = false

Vue.use(router)
Vue.use(ElementUI)
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL=global_.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.withCredentials=false
Vue.prototype.$axios = axios
axios.defaults.headers.common['Hippotoken'] = localStorage.getItem("Hippotoken");
router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})

new Vue({
  el: '#app',
  router,
    store,
  render: h => h(App)
}).$mount('#app')
