import axios from 'axios'
const url = 'http://127.0.0.1:3000'

export default {
  getNotifications ({ commit }) {
    axios.get(`${url}/users/notifications`).then((response) => {
      console.log(response)
      commit('setNotifications', response.data)
    })
  },
  register ({ commit }, user) {
    return new Promise((resolve) => {
      axios.post(`${url}/users/signup`, user).then((response) => {
        console.log(response)
        window.localStorage.setItem('token', response.data.token)
        window.localStorage.setItem('user', JSON.stringify(response.data.user))
        axios.defaults.headers.common['authorization'] = `bearer ${response.data.token}`
        commit('saveUserInfo', response.data.user)
        resolve()
      })
    })
  },
  login ({ commit }, user) {
    return new Promise((resolve) => {
      axios.post(`${url}/users/login`, user).then((response) => {
        window.localStorage.setItem('token', response.data.token)
        window.localStorage.setItem('user', JSON.stringify(response.data.user))
        axios.defaults.headers.common['authorization'] = `bearer ${response.data.token}`
        commit('saveUserInfo', response.data.user)
        resolve()
      })
    })
  },
  UsersFriendshipChanges ({ commit }, info) {
    let type = info.type
    if (info.type.match(/remove/)) {
      type = 'remove'
    }
    axios.patch(`${url}/users/friendship/${type}`, {_id: info.user._id}).then((response) => {
      commit('resortUsersArray', info)
    })
  },
  getUsersList ({ commit, state }, data) {
    const params = {}
    if (state.activeFriend._id) { params.friendId = state.activeFriend._id }
    axios.get(`${url}/users`, {params}).then((usersResponse) => {
      const data = usersResponse.data
      axios.get(`${url}/users/friendship`).then((friendsResponse) => {
        data.friends = friendsResponse.data.friends
        commit('setUsersList', data)
      })
    })
  }
}
