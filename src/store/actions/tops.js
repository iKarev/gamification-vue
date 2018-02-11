import axios from 'axios'
const url = 'http://127.0.0.1:3000'

export default {
  saveTopToServer ({ commit }, top) {
    axios.post(`${url}/tops`, top).then((response) => {
      top._id = response.data.createdTop._id
      commit('addTopToList', top)
    })
  },
  updateTop ({ commit }, top) {
    const data = [
      {'propName': 'name', 'value': top.name},
      {'propName': 'deadline', 'value': top.deadline},
      {'propName': 'targetId', 'value': top.target._id},
      {'propName': 'targetName', 'value': top.target.name}
    ]
    axios.patch(`${url}/tops/${top._id}`, data).then((response) => {
      commit('updateTop', top)
    })
  },
  getTopsFromServer ({ commit }, data) {
    let query = ``
    if (data) {
      for (const i in data) {
        query += query.length < 1 ? `?${i}=${data[i]}` : `&${i}=${data[i]}`
      }
    }
    axios.get(`${url}/tops${query}`).then((response) => {
      const tops = []
      if (response.data.length) {
        for (let i = 0; i < 5; i++) {
          const top = response.data.find(t => t.type === i)
          tops[i] = top || {price: null, name: '', description: '', target: {}}
          tops[i].type = i
        }
      } else {
        for (let i = 0; i < 5; i++) {
          tops[i] = {type: i, price: null, name: '', description: '', target: {}}
        }
      }
      commit('setTopsList', tops)
    })
  },
  getTopFromServer ({ commit }, topId) {
    axios.get(`${url}/tops/${topId}`).then((response) => {
      const top = response.data.top
      const editTop = {
        deadline: top.deadline,
        name: top.name,
        _id: top._id,
        target: { name: top.targetName, _id: top.targetId }
      }
      commit('setActiveTop', editTop)
    })
  },
  deleteTop ({ commit }, topId) {
    axios.delete(`${url}/tops/${topId}`).then((response) => {
      commit('deleteTop', topId)
    })
  }
}
