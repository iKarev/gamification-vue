import axios from 'axios'
import topsActions from './actions/tops'
import targetsActions from './actions/targets'
import usersActions from './actions/users'
import calendarActions from './actions/calendar'
import doingsActions from './actions/doings'

if (window.localStorage.getItem('token')) {
  axios.defaults.headers.common['authorization'] = `bearer ${window.localStorage.getItem('token')}`
}

const actions = {}

for (let action in topsActions) { actions[action] = topsActions[action] }
for (let action in targetsActions) { actions[action] = targetsActions[action] }
for (let action in usersActions) { actions[action] = usersActions[action] }
for (let action in calendarActions) { actions[action] = calendarActions[action] }
for (let action in doingsActions) { actions[action] = doingsActions[action] }

export default actions
