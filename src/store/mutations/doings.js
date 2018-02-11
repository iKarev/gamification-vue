export default {
  addDoingToList (state, doing) {
    state.doings.push(doing)
  },
  updateDoing (state, updatedDoing) {
    const index = state.doings.findIndex(doing => doing._id === updatedDoing._id)
    state.doings[index] = updatedDoing
    state.doings = state.doings.slice()
  },
  updatePeriodDoing (state, updatedDoing) {
    const index = state.doings.findIndex(doing => doing._id === updatedDoing._id)
    state.doings[index].value = updatedDoing.value
    state.doings = state.doings.slice()
  },
  changeDoing (state, doing, changes) {
    const index = state.doings.findIndex(d => d._id === doing._id)
    for (const i in changes) {
      state.doings[index][i] = changes[i]
    }
    state.doings = state.doings.slice()
  },
  setDoingsList (state, doings) {
    state.doings = doings
  },
  deleteDoing (state, doingId) {
    const doingIndex = state.doings.findIndex(t => t._id === doingId)
    state.doings.splice(doingIndex, 1)
  }
}
