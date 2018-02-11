import axios from 'axios'
import topsActions from './actions/tops'
import targetsActions from './actions/targets'
import calendarActions from './actions/calendar'
import doingsActions from './actions/doings'

const url = 'http://127.0.0.1:3000'

if (window.localStorage.getItem('token')) {
  axios.defaults.headers.common['authorization'] = `bearer ${window.localStorage.getItem('token')}`
}

const actions = {
  register ({ commit }, user) {
    axios.post(`${url}/users/signup`, user).then((response) => {
    })
  },
  login ({ commit }, user) {
    axios.post(`${url}/users/login`, user).then((response) => {
      window.localStorage.setItem('token', response.data.token)
      axios.defaults.headers.common['authorization'] = `bearer ${response.data.token}`
      // commit('addTopToList', response.data.createdTop)
    })
  }
}

for (let action in topsActions) { actions[action] = topsActions[action] }
for (let action in targetsActions) { actions[action] = targetsActions[action] }
for (let action in calendarActions) { actions[action] = calendarActions[action] }
for (let action in doingsActions) { actions[action] = doingsActions[action] }

export default actions
