// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import dateTextDirective from './directives/dateTextDirective.js'

import { store } from './store/store'
import('../node_modules/vuetify/dist/vuetify.min.css')
import('./styles/index.scss')

Vue.use(VueAxios, axios)
Vue.use(Vuetify)

Vue.component('icon', Icon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  directives: { dateTextDirective }
})
