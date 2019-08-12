import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import '../src/assets/common-css/index.css'

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
