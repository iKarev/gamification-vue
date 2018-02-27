export default {
  addTargetToList (state, target) {
    state.targets.push(target)
  },
  updateTarget (state, updatedTarget) {
    const index = state.targets.findIndex(target => target._id === updatedTarget._id)
    state.targets[index] = updatedTarget
    state.targets = state.targets.slice()
  },
  changeTarget (state, target, changes) {
    const index = state.targets.findIndex(t => t._id === target._id)
    for (const i in changes) {
      state.targets[index][i] = changes[i]
    }
    state.targets = state.targets.slice()
  },
  setTargetsList (state, data) {
    state.targets = data.targets
  },
  setActiveTarget (state, data) {
    state.activeTarget = data
  },
  deleteTarget (state, targetId) {
    const targetIndex = state.targets.findIndex(t => t._id === targetId)
    state.targets.splice(targetIndex, 1)
  },
  setTargetStatistics (state, tops) {
    const targets = {}
    tops = tops.filter((item) => item.target._id)
    tops.forEach((item) => {
      if (targets[item.target._id]) {
        targets[item.target._id].value++
      } else {
        targets[item.target._id] = {
          value: 1,
          name: item.target.name
        }
      }
    })
    const series = []
    for (let i in targets) {
      const item = targets[i]
      series.push([item.name, item.value])
    }
    state.statisticsTopsToTargets = series
  }
}
