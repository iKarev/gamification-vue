import Vue from 'vue'

const monthesNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

export default Vue.directive('date-text', {
  bind: (el, binding, vnode) => {
    const v = binding.value
    const date = v.date
    if (date.length) {
      if (v.periodType === '4') {
        el.innerHTML = `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`
      } else if (v.periodType === '3') {
        const s = new Date(date.slice(0, 4), date.slice(5, 7) - 1, date.slice(8, 10))
        if (s) {
          const e = new Date(s.getFullYear(), s.getMonth(), s.getDate() + 6)
          const startText = `${date.slice(8, 10)}.${date.slice(5, 7)}`
          const endText = `${check(e.getDate())}.${check(e.getMonth() + 1)}`
          el.innerHTML = `${startText} - ${endText}`
        }
      } else if (v.periodType === '2') {
        el.innerHTML = `${monthesNames[parseInt(date.slice(5, 7)) - 1]} ${date.slice(0, 4)}`
      }
    } else {
      return ''
    }

    function check (num) {
      return num < 10 ? `0${num}` : num
    }
  }
})
