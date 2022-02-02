import GroupService from "@/services/GroupService"

export const namespaced = true

export const state = {
  groups: [],
  currentGroup: {},
  loading: true,
  error: null
}

export const mutations = {
  ADD_GROUP (state, group) {
    state.groups.push(group)
  },
  SET_CURRENT_GROUP (state, payload) {
    state.currentGroup = payload
  },
  SET_STATUS (state, payload) {
    const index = state.groups.findIndex(item => item.id === payload.id)
    state.groups[index].status = payload.status
  },
  SET_GROUPS (state, payload) {
    state.groups = payload
  },
  SET_LOADING (state, loading) {
    state.loading = loading
  },
  SET_ERROR (state, error) {
    state.error = error
  }
}

export const actions = {
  createGroup ({ commit }, payload) {
    /* eslint-disable */
    return new Promise((resolve, reject) => {
      GroupService.create(payload)
        .then((response) => {
          commit("ADD_GROUP", response.data)
          resolve(response)
        })
        .catch((error) => {
          commit("SET_ERROR", error.response)
          reject(error)
        })
    })
    /* eslint-enable */
  },
  createGroupMember ({ commit }) {
    /* eslint-disable */
    commit("SET_ERROR", error.response)
    /* eslint-enable */
  },
  getMyGroups ({ commit }) {
    /* eslint-disable */
    commit("SET_LOADING", true)
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", true)
      GroupService.myGroups()
        .then((response) => {
          console.log(response.data)
          commit("SET_GROUPS", response.data.groups)
          commit("SET_LOADING", false)
          resolve('loaded')
        })
        .catch((error) => {
          commit("SET_ERROR", error.response)
          commit("SET_LOADING", false)
          reject(error)
        })
    })
    /* eslint-enable */
  },
  loadGroup ({ commit }, payload) {
    /* eslint-disable */
    commit("SET_LOADING", true)
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", true)
      GroupService.getGroup(payload)
        .then((response) => {
          console.log(response.data)
          commit("SET_CURRENT_GROUP", response.data)
          commit("SET_LOADING", false)
          resolve('loaded')
        })
        .catch((error) => {
          commit("SET_ERROR", error.response)
          commit("SET_LOADING", false)
          reject(error)
        })
    })
    /* eslint-enable */
  },
  removeGroupMember ({ commit }) {
    /* eslint-disable */
    commit("SET_ERROR", error.response)
    /* eslint-enable */
  },
  updateGroupDetails ({ commit }, payload) {
    /* eslint-disable */
    return new Promise((resolve, reject) => {
      GroupService.update(state.currentGroup.id, payload)
        .then((response) => {
          commit("SET_CURRENT_GROUP", response.data)
          resolve('updated')
        })
        .catch((error) => {
          commit("SET_ERROR", error.response)
          reject(error)
        })
    })
    /* eslint-enable */
  },
  updateGroupMember ({ commit }) {
    /* eslint-disable */
    commit("SET_ERROR", error.response)
    /* eslint-enable */
  }
}

export const getters = {
  groups: (state) => {
    return state.groups
  },
  getGroup: (state) => {
    return state.currentGroup
  },
  loading: (state) => {
    return state.loading
  },
  error: (state) => {
    return state.error
  }
}
