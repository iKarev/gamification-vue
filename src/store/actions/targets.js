import axios from 'axios'
const url = 'http://127.0.0.1:3000'

export default {
  saveTargetToServer ({ commit }, target) {
    axios.post(`${url}/targets`, target).then((response) => {
      const mutation = target.type === 0 ? 'setActiveTarget' : 'addTargetToList'
      commit(mutation, response.data.createdTarget)
    })
  },
  updateTarget ({ commit }, target) {
    const data = [
      {'propName': 'name', 'value': target.name},
      {'propName': 'price', 'value': target.price}
    ]
    axios.patch(`${url}/targets/${target._id}`, data).then((response) => {
      target.edit = false
      commit('updateTarget', target)
    })
  },
  getTargetsFromServer ({ commit }, data) {
    let id = ''
    let query = ``
    if (data) {
      for (const i in data) {
        if (i === 'parentTargetId') {
          id = '/' + data[i] + '/list'
        } else {
          query += query.length < 1 ? `?${i}=${data[i]}` : `&${i}=${data[i]}`
        }
      }
    }
    axios.get(`${url}/targets${id}${query}`).then((response) => {
      commit('setTargetsList', response.data)
    })
  },
  getTargetFromServer ({ commit }, targetId) {
    axios.get(`${url}/targets/${targetId}`).then((response) => {
      if (targetId === 'main' && !response.data._id) {
        commit('setActiveTarget', {type: 0, deadline: '', name: '', description: '', edit: true})
      } else {
        commit('setActiveTarget', response.data)
      }
    })
  },
  deleteTarget ({ commit }, targetId) {
    axios.delete(`${url}/targets/${targetId}`).then((response) => {
      commit('deleteTarget', targetId)
    })
  }
}
