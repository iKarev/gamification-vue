export default {
  addTopToList (state, top) {
    state.tops[top.index] = top
    state.tops = state.tops.slice()
  },
  updateTop (state, updatedTop) {
    const index = state.tops.findIndex(top => top._id === updatedTop._id)
    state.tops[index] = updatedTop
    state.activeTop = {name: '', target: null, deadline: null}
    state.tops = state.tops.slice()
  },
  changeTop (state, top, changes) {
    const index = state.tops.findIndex(t => t._id === top._id)
    for (const i in changes) {
      state.tops[index][i] = changes[i]
    }
    state.tops = state.tops.slice()
  },
  setTopsList (state, tops) {
    state.tops = tops
  },
  setActiveTop (state, top) {
    state.activeTop = top
  },
  deleteTop (state, topId) {
    const topIndex = state.tops.findIndex(t => t._id === topId)
    state.tops.splice(topIndex, 1)
  }
}
