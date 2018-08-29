import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import createRouter from './config/router'
import createStore from './store'
import './assets/styles/base.scss'
import App from './app.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return {app, router, store}
}
