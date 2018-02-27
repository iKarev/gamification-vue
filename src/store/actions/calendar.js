import axios from 'axios'
const url = 'http://127.0.0.1:3000'

export default {
  getCalendarMonth ({ commit, state }, date) {
    const daysInMonth = 32 - new Date(date.year, date.month - 1, 32).getDate()
    const params = {
      startDate: `${date.year}.${checkNumber(date.month)}.01`,
      endDate: `${date.year}.${checkNumber(date.month)}.${daysInMonth}`
    }
    if (state.activeFriend._id) { params.friendId = state.activeFriend._id }
    axios.get(`${url}/tops`, {params}).then((res) => {
      tops = res.data
      checkResponses()
    })
    axios.get(`${url}/doings`, {params}).then((res) => {
      doings = res.data.doings
      checkResponses()
    })
    let tops = null
    let doings = null
    let count = 0
    function checkNumber (num) {
      return num < 10 ? `0${num}` : num
    }
    function checkResponses () {
      count++
      if (count === 2) {
        commit('setCalendarMonth', {date, tops, doings})
      }
    }
  }
}
