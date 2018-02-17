import axios from 'axios'
const url = 'http://127.0.0.1:3000'

export default {
  saveDoingToServer ({ commit }, doing) {
    axios.post(`${url}/doings`, doing).then((response) => {
      commit('addDoingToList', response.data.createdDoing)
    })
  },
  markPeriodDoing ({ commit }, data) {
    const params = { date: data.date, value: data.value }
    axios[data.method](`${url}/doings/${data.doingId}/implements`, params).then((response) => {
      commit('updatePeriodDoing', {_id: data.doingId, value: data.value})
    })
  },
  updateDoing ({ commit }, doing) {
    const data = []
    for (let i in doing) {
      data.push({'propName': i, 'value': doing[i]})
    }
    axios.patch(`${url}/doings/${doing._id}`, data).then((response) => {
      doing.edit = false
      commit('updateDoing', doing)
    })
  },
  getDoingsFromServer ({ commit, state }, data) {
    let query = ``
    if (data) {
      for (const i in data) {
        query += query.length < 1 ? `?${i}=${data[i]}` : `&${i}=${data[i]}`
      }
    }
    const params = {}
    if (state.activeFriend._id) { params.friendId = state.activeFriend._id }
    axios.get(`${url}/doings${query}`, {params}).then((response) => {
      commit('setDoingsList', response.data.doings)
    })
  },
  getPeriodDoingsFromServer ({ commit, state }, data) {
    const params = {}
    if (state.activeFriend._id) { params.friendId = state.activeFriend._id }
    axios.get(`${url}/doings/${data.date}/type/${data.periodType}`, {params}).then((response) => {
      commit('setDoingsList', response.data.doings)
    })
  },
  getDoingFromServer ({ commit }, doingId) {
    axios.get(`${url}/doings/${doingId}`).then((response) => {
      if (doingId === 'main' && !response.data._id) {
        commit('setActiveDoing', {type: 0, deadline: '', name: '', description: '', edit: true})
      } else {
        commit('setActiveDoing', response.data)
      }
    })
  },
  deleteDoing ({ commit }, doingId) {
    axios.delete(`${url}/doings/${doingId}`).then((response) => {
      commit('deleteDoing', doingId)
    })
  }
}
