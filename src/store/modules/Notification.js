export const namespaced = true

export const state = {
  notifications: [],
  n: {
    id: 1,
    action_user: {
      name: "Brian Maguire",
      avatar: null
    },
    action_type: "abc"
  },
  loading: true,
  error: null
}

export const mutations = {
  SET_NOTIFICATIONS (state, payload) {
    state.notifications.push(state.n)
    state.notifications.push(state.n)
    state.notifications.push(state.n)
  },
  SET_LOADING (state, loading) {
    state.loading = loading
  },
  SET_ERROR (state, error) {
    state.error = error
  }
}

export const actions = {
  loadNotifications ({ commit }, payload) {
    /* eslint-disable */
    commit('SET_NOTIFICATIONS', [])
    commit('SET_LOADING', false)
    /* eslint-enable */
  }
}

export const getters = {
  notifications: (state) => {
    return state.notifications
  },
  loading: (state) => {
    return state.loading
  },
  error: (state) => {
    return state.error
  }
}
