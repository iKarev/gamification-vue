export default {
  setUsersList (state, data) {
    const users = {
      all: [],
      new: [],
      request: [],
      common: []
    }

    for (let friend of data.friends) {
      const index = data.users.findIndex((u) => u._id === friend._id)
      const user = data.users.splice(index, 1)[0]
      users[friend.status].push(user)
    }
    users.all = data.users
    state.users = users
  },
  saveUserInfo (state, user) {
    state.user = user
  },
  setFriendView (state, friend) {
    state.activeFriend = friend
  },
  deleteActiveFriend (state) {
    state.activeFriend = { name: null, email: null, _id: null }
  }
}
