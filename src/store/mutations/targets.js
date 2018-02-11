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
  }
}
