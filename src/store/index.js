import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: window.localStorage.getItem('JWT_TOKEN') == null ? '' : JSON.parse(window.localStorage.getItem('JWT_TOKEN' || '[]')),
    adminMenus: []
  },
  mutations: {
    initAdminMenu (state, menus) {
      state.adminMenus = menus
    },
    login (state, data) {
      state.JWT_TOKEN = data
      window.localStorage.setItem('JWT_TOKEN', JSON.stringify(data))
    },
    logout (state) {
      // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
      state.JWT_TOKEN = ''
      window.localStorage.removeItem('JWT_TOKEN')
      state.adminMenus = []
    }
  },
  actions: {
  }
})

