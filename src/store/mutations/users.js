export default {
  setNotifications (state, data) {
    state.notifications = data.notifications
  },
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
  },
  resortUsersArray (state, info) {
    let shiftArray, unShiftArray
    switch (info.type) {
      case 'request':
        shiftArray = 'all'
        unShiftArray = 'request'
        break
      case 'accept':
        shiftArray = 'new'
        unShiftArray = 'common'
        break
      case 'removeCommon':
        shiftArray = 'common'
        unShiftArray = 'all'
        break
      case 'removeNew':
        shiftArray = 'new'
        unShiftArray = 'all'
        break
      case 'removeRequest':
        shiftArray = 'request'
        unShiftArray = 'all'
        break
    }
    const users = {...state.users}
    const index = users[shiftArray].findIndex((item) => item._id === info.user._id)
    const user = users[shiftArray].splice(index, 1)[0]
    users[unShiftArray].unshift(user)
    state.users = users
  }
}
