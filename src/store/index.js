import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   // username: window.localStorage.getItem('username') == null ? '' : JSON.parse(window.localStorage.getItem('username' || '[]')),
    adminMenus: [],
    token:''
  },
  mutations: {
    initAdminMenu (state, menus) {
      state.adminMenus = menus
    },
    login (state, data) {
   //   state.username = data
      state.token = data
      window.localStorage.setItem('username', JSON.stringify(data))
      window.localStorage.setItem('token', data)
    },
    logout (state) {
      window.localStorage.removeItem('username')
      window.localStorage.removeItem('token')
      state.adminMenus = []
    }
  },
  actions: {
  }
})
