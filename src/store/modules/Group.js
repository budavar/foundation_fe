import GroupService from "@/services/GroupService"

export const namespaced = true

export const state = {
  groups: [],
  loading: true,
  error: null
}

export const mutations = {
  ADD_GROUP (state, group) {
    state.groups.push(group)
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
  }
}

export const getters = {
  groups: (state) => {
    return state.groups
  },
  loading: (state) => {
    return state.loading
  },
  error: (state) => {
    return state.error
  }
}
