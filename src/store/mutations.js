import calendarMutations from './mutations/calendar'
import targetsMutations from './mutations/targets'
import topsMutations from './mutations/tops'
import doingsMutations from './mutations/doings'
import usersMutations from './mutations/users'

const mutations = {}

for (let mutation in calendarMutations) { mutations[mutation] = calendarMutations[mutation] }
for (let mutation in targetsMutations) { mutations[mutation] = targetsMutations[mutation] }
for (let mutation in usersMutations) { mutations[mutation] = usersMutations[mutation] }
for (let mutation in topsMutations) { mutations[mutation] = topsMutations[mutation] }
for (let mutation in doingsMutations) { mutations[mutation] = doingsMutations[mutation] }

export default mutations
