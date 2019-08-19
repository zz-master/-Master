import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import '../src/assets/common-css/index.css'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
