import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    drawer: null,
    tops: [],
    targets: [],
    doings: [],
    month: {},
    activeTarget: {
      name: '',
      description: '',
      edit: false,
      parentTargetId: '',
      deadline: ''
    },
    activeTop: {
      price: null,
      name: '',
      description: '',
      target: null
    }
  },
  getters,
  mutations,
  actions
})
