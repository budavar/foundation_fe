import FriendService from "@/services/FriendService"

export const namespaced = true

export const state = {
  friends: [],
  loading: false,
  error: null
}

export const mutations = {
  ADD_FRIEND (state, friend) {
    state.friends.push(friend)
  },
  DELETE_REQUEST (state, payload) {
    const index = state.friends.findIndex(item => item.friend_resource_id === payload.id)
    state.friends.splice(index, 1)
  },
  SET_STATUS (state, payload) {
    const index = state.friends.findIndex(item => item.friend_resource_id === payload.id)
    state.friends[index].status = payload.status
  },
  SET_FRIENDS (state, friends) {
    state.friends = friends
  },
  SET_LOADING (state, loading) {
    state.loading = loading
  },
  SET_ERROR (state, error) {
    state.error = error
  }
}

export const actions = {
  getFriends ({ commit }) {
    commit("SET_LOADING", true)
    /* eslint-disable */
    FriendService.getFriends()
      .then((response) => {
        commit("SET_FRIENDS", response.data.result)
      })
      .catch((error) => {
        commit("SET_ERROR", getError(error))
      })
      .finally(commit("SET_LOADING", false))
    /* eslint-enable */
  },
  addFriend ({ commit }, userId) {
    /* eslint-disable */
    const formData = new FormData
    formData.append("user_id", userId)
    FriendService.sendFriendRequest(formData)
      .then((response) => {
        commit("ADD_FRIEND", response.data.result)
      })
      .catch((error) => {
        commit("SET_ERROR", error.response)
      })
    /* eslint-enable */
  },
  async setRequestToAccept ({ commit }, friendId) {
    /* eslint-disable */
    await FriendService.accept(friendId)
      .then((response) => {
        commit("SET_STATUS", response.data.result)
      })
      .catch((error) => {
        commit("SET_ERROR", error.response)
      })
    /* eslint-enable */
  },
  async setRequestToBlock ({ commit }, friendId) {
    /* eslint-disable */
    await FriendService.block(friendId)
      .then((response) => {
        commit("SET_ERROR", error.response)
      })
      .catch((error) => {
        commit("SET_ERROR", error.response)
      })
    /* eslint-enable */
  },
  deleteRequest ({ commit }, friendId) {
    /* eslint-disable */
    return new Promise((resolve, reject) => {
      FriendService.delete("friendId")
        .then((response) => {
          commit("DELETE_REQUEST", response.data.result)
          resolve('ok')
        })
        .catch((error) => {
          commit("SET_ERROR", error.response)
          reject('not-ok')
        })
    })
    /* eslint-enable */
  },
  async XdeleteRequest ({ commit }, friendId) {
    /* eslint-disable */
    await FriendService.delete("friendId")
      .then((response) => {
        commit("DELETE_REQUEST", response.data.result)
      })
      .catch((error) => {
        commit("SET_ERROR", error.response)
      })
    /* eslint-enable */
  }
}

export const getters = {
  friends: (state) => {
    return state.friends
  },
  loading: (state) => {
    return state.loading
  },
  error: (state) => {
    return state.error
  }
}
