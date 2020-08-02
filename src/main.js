import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from "axios";
import global_ from './Global'
import 'element-ui/lib/theme-chalk/display.css';
import store from './store'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(router)
Vue.use(ElementUI)
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL=global_.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.withCredentials=false
Vue.prototype.$axios = axios


axios.interceptors.request.use(
    config => {
      let token = window.localStorage.getItem('token')
      if (token && token !== '') {
        config.headers.hippotoken = token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.headers['hippotoken']!==''&&response.headers['hippotoken']){
            store.commit('login', response.headers['hippotoken']);
            return response;  //请求成功的时候返回的data
        }else {
            return response;  //请求成功的时候返回的data
        }
    },error => {
        if (error.response.data.errCode === 401) {
            router.replace('/')
            Vue.prototype.$message('登陆令牌失效，请求失败');
        }
    })

router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {  //如果未匹配到路由
        next('/')
    }else {
        if(to.meta.title){
            document.title = to.meta.title
        }
        next();    //如果匹配到正确跳转
    }
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount('#app')
