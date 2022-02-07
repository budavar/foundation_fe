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
  ADD_MEMBER (state, member) {
    state.currentGroup.members.push(member)
  },
  REMOVE_GROUP (state, payload) {
    const index = state.groups.findIndex(item => item.id === payload)
    if (index > -1) {
      state.groups.splice(index, 1)
    }
  },
  REMOVE_MEMBER (state, payload) {
    const index = state.currentGroup.members.findIndex(item => item.id === payload)
    if (index > -1) {
      state.currentGroup.members.splice(index, 1)
    }
  },
  SET_CURRENT_GROUP (state, payload) {
    state.currentGroup = payload
    const index = state.currentGroup.members.findIndex(item => item.user_id === state.currentGroup.owner_id)
    if (index > -1) {
      state.currentGroup.my_member = state.currentGroup.members[index]
    }
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
  },
  UPDATE_MEMBER (state, payload) {
    // Update the member being managed
    let index = state.currentGroup.members.findIndex(item => item.id === payload.id)
    state.currentGroup.members[index] = payload
    console.log(payload)
    if (state.currentGroup.my_member.user_id === payload.user_id) {
      state.currentGroup.my_member = payload
    }
    state.currentGroup.my_member = payload
    // Get the Group entry from the list
    index = state.groups.findIndex(item => item.id === payload.group_id)
    if (index > -1) {
      // If the member being managed is me then update as well.  Also update the my_authority entry based on role
      if (state.groups[index].my_member.id === payload.id) {
        state.groups[index].my_member = payload
        state.groups[index]._my_authority = payload.role
      }
    }
  }
}

export const actions = {
  activateGroupMember ({ commit }, payload) {
    /* eslint-disable */
    return new Promise((resolve, reject) => {
      GroupService.memberActivate(payload.memberId)
        .then((response) => {
          commit("UPDATE_MEMBER", response.data)
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          commit("SET_ERROR", error.response)
          reject(error)
        })
    })
    /* eslint-enable */
  },
  blockGroupMember ({ commit }, payload) {
    /* eslint-disable */
    return new Promise((resolve, reject) => {
      GroupService.memberBlock(payload.memberId)
        .then((response) => {
          commit("UPDATE_MEMBER", response.data)
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          commit("SET_ERROR", error.response)
          reject(error)
        })
    })
    /* eslint-enable */
  },
  changeMemberRole ({ commit }, payload) {
    /* eslint-disable */
    return new Promise((resolve, reject) => {
      GroupService.memberChangeRole(payload)
        .then((response) => {
          commit("UPDATE_MEMBER", response.data)
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          commit("SET_ERROR", error.response)
          reject(error)
        })
    })
    /* eslint-enable */
  },
  closeOpenGroup ({ commit }, payload) {
    /* eslint-disable */
    return new Promise((resolve, reject) => {
      GroupService.closeOpen(payload)
        .then((response) => {
          commit("SET_GROUP_STATUS", response.data)
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          commit("SET_ERROR", error.response)
          reject(error)
        })
    })
    /* eslint-enable */
  },
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
  createGroupMember ({ commit }, payload) {
    /* eslint-disable */
    return new Promise((resolve, reject) => {
      GroupService.memberCreate(payload)
        .then((response) => {
          if (payload.action === 'member-management') {
            commit("ADD_MEMBER", response.data)
          }
          // Remove Group from list of available groups to join
          if (payload.action === 'personal') {
            commit("REMOVE_GROUP", payload.groupId)
          }
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          commit("SET_ERROR", error.response)
          reject(error)
        })
    })
    /* eslint-enable */
  },
  getMyGroups ({ commit }) {
    /* eslint-disable */
    commit("SET_LOADING", true)
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", true)
      GroupService.myGroups()
        .then((response) => {
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
  groupSearchInit ({ commit }) {
    /* eslint-disable */
    commit("SET_GROUPS", [])
    commit("SET_LOADING", false)
    /* eslint-enable */
  },
  loadGroup ({ commit }, payload) {
    /* eslint-disable */
    commit("SET_LOADING", true)
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", true)
      GroupService.getGroup(payload)
        .then((response) => {
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
  removeGroupMember ({ commit }, payload) {
    /* eslint-disable */
    return new Promise((resolve, reject) => {
      GroupService.memberRemove(payload.memberId)
        .then((response) => {
          if (payload.action === 'member-management') {
            commit("REMOVE_MEMBER", payload.memberId)
          }
          // Remove Group from list of groups
          if (payload.action === 'personal') {
            commit("REMOVE_GROUP", payload.groupId)
          }
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          commit("SET_ERROR", error.response)
          reject(error)
        })
    })
    /* eslint-enable */
  },
  searchForGroups ({ commit }, payload) {
    /* eslint-disable */
    commit("SET_LOADING", true)
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", true)
      GroupService.search(payload)
        .then((response) => {
          commit("SET_GROUPS", response.data.groups.map(obj => ({ ...obj, my_member: null })))
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
  updateMemberSettings ({ commit }, payload) {
    /* eslint-disable */
    return new Promise((resolve, reject) => {
      GroupService.memberUpdateSettings(payload)
        .then((response) => {
          commit("UPDATE_MEMBER", response.data)
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
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
  getGroup: (state) => {
    return state.currentGroup
  },
  getGroupAuthority: (state) => {
    return state.currentGroup._my_authority
  },
  loading: (state) => {
    return state.loading
  },
  error: (state) => {
    return state.error
  }
}
