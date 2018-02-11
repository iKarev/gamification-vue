export default {
  setCalendarMonth (state, info) {
    const startDate = new Date(info.date.year, info.date.month - 1, 1)
    const startMonthDay = new Date(startDate.getFullYear(), startDate.getMonth(), 1)
    const start = startMonthDay.getDay()

    let day = start > 0 ? startMonthDay.getDate() - (start - 1) : -5

    const calendar = {
      days: {},
      weeks: {}
    }

    let count = 0
    const max = 100
    let nextDate = new Date(startDate.getFullYear(), startDate.getMonth(), day)

    while (count < max && (count < 35 || (nextDate.getDay() !== 1 || nextDate.getMonth() === startDate.getMonth()))) {
      addPeriod('days', 4)
      if (count % 7 === 0) addPeriod('weeks', 3)
      day++
      nextDate = new Date(startDate.getFullYear(), startDate.getMonth(), day)
      count++
    }

    const dayTops = []
    const weekTops = []
    const monthTops = []
    for (const top of info.tops) {
      if (top.periodType === 4) dayTops.push(top)
      else if (top.periodType === 3) weekTops.push(top)
      else if (top.periodType === 2) monthTops.push(top)
    }

    for (const top of dayTops) { calendar.days[top.date].tops.push(top) }
    for (const top of weekTops) { calendar.weeks[top.date].tops.push(top) }

    const daysArray = []
    for (const d in calendar.days) { daysArray.push(calendar.days[d]) }
    const weeksArray = []
    for (const w in calendar.weeks) { weeksArray.push(calendar.weeks[w]) }

    state.month = {
      days: daysArray,
      weeks: weeksArray,
      info: {date: startDate, tops: monthTops, periodType: 2, dateString: setDateString(startDate)},
      month: info.date.month,
      year: info.date.year
    }
    function addPeriod (period, periodType) {
      const dateString = setDateString(nextDate)
      calendar[period][dateString] = {date: nextDate, tops: [], periodType, dateString}
    }
    function setDateString (date) {
      return `${date.getFullYear()}.${checkNumber(date.getMonth() + 1)}.${checkNumber(date.getDate())}`
    }
    function checkNumber (num) {
      return num < 10 ? `0${num}` : num
    }
  }
}
