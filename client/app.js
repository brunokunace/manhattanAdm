import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import { TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'

Vue.router = router
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:8090/api'
Vue.use(VueAuth, {
  auth: {
    request: function (req, token) {
      this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token})
    },
    response: function (res) {
      var token = res.data.token
      if (token) {
        token = token.split('Bearer ')
        return token[token.length > 1 ? 1 : 0]
      }
    }
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: { url: 'users/authenticate' },
  refreshData: { enabled: false },
  fetchData: { url: 'users/me' },
  rolesVar: 'role'

})
Vue.use(NProgress)

// Enable devtools
Vue.config.devtools = true

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

const { state } = store

router.beforeEach((route, redirect, next) => {
  if (state.app.device.isMobile && state.app.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
  }
  next()
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const app = new Vue({
  router,
  store,
  nprogress,
  ...App
})

export { app, router, store }
