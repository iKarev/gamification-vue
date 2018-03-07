import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const userExists = window.localStorage.getItem('user')
let user
if (userExists) {
  user = JSON.parse(userExists)
}

export const store = new Vuex.Store({
  state: {
    drawer: null,
    tops: [],
    users: {
      all: [],
      new: [],
      request: [],
      common: []
    },
    targets: [],
    doings: [],
    month: {},
    activeFriend: {
      email: null,
      name: null,
      _id: null
    },
    notifications: {},
    statisticsTopsToTargets: null,
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
      target: null,
      done: null
    },
    user: {
      email: user ? user.email : '',
      _id: user ? user._id : ''
    }
  },
  getters,
  mutations,
  actions
})
