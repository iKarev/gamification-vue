import axios from 'axios'
const url = 'http://127.0.0.1:3000'

export default {
  getCalendarMonth ({ commit }, date) {
    const daysInMonth = 32 - new Date(date.year, date.month - 1, 32).getDate()
    const params = {
      startDate: `${date.year}.${checkNumber(date.month)}.01`,
      endDate: `${date.year}.${checkNumber(date.month)}.${daysInMonth}`
    }
    axios.get(`${url}/tops`, {params}).then((res) => {
      commit('setCalendarMonth', {date, tops: res.data})
    })
    function checkNumber (num) {
      return num < 10 ? `0${num}` : num
    }
  }
}
