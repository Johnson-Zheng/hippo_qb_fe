import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'


Vue.config.productionTip = false

Vue.use(router)
Vue.use(ElementUI)


router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
