import NotificationService from "@/services/NotificationService"

export const namespaced = true

export const state = {
  notifications: [],
  loadingControls: {
    fetchRequests: 0,
    more: false,
    nextFetchLoading: false
  },
  loading: true,
  error: null
}

export const mutations = {
  INIT_LOADING_CONTROLS (state) {
    state.loadingControls = {
      fetchRequests: 0,
      more: false,
      nextFetchLoading: false
    }
  },
  SET_LOADING (state, loading) {
    state.loading = loading
  },
  SET_LOAD_MORE (state, loadMore) {
    state.loadingControls.nextFetchLoading = loadMore
  },
  SET_NOTIFICATIONS (state, payload) {
    state.notifications.push(...payload.notifications)
    state.loadingControls = {
      fetchRequests: payload.current_fetch,
      more: payload.more_rows,
      nextFetchLoading: false
    }
  },
  SET_ERROR (state, error) {
    state.error = error
  }
}

export const actions = {
  loadNotifications ({ commit }, payload) {
    /* eslint-disable */
    if (payload.pagination === 'init') {
      commit("SET_LOADING", true)
      commit("INIT_LOADING_CONTROLS")
    } else {
      commit("SET_LOAD_MORE", true)
    }
    console.log(payload)
    return new Promise((resolve, reject) => {
      NotificationService.list(payload)
        .then((response) => {
          commit("SET_NOTIFICATIONS", response.data)
          commit("SET_LOADING", false)
          resolve('loaded')
        })
        .catch((error) => {
          commit("SET_ERROR", error.response)
          commit("SET_LOADING", false)
          commit("SET_LOAD_MORE", false)
          reject(error)
        })
    })
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
  loadingControls: (state) => {
    return state.loadingControls
  },
  error: (state) => {
    return state.error
  }
}
