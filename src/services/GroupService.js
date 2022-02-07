import * as API from "@/services/API"

export default {
  closeOpen (payload) {
    return API.apiClient.put('/groups/' + payload.groupId + '/' + payload.action)
  },
  create (payload) {
    return API.apiClient.post('/groups', payload)
  },
  getGroup (payload) {
    return API.apiClient.get(`/groups/` + payload)
  },
  myGroups () {
    return API.apiClient.get(`/groups`)
  },
  search (payload) {
    return API.apiClient.get(`/groups/search`, { params: payload })
  },
  update (id, payload) {
    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
        boundary: payload._boundary
      }
    }
    return API.apiClient.post('/groups/' + id, payload, config)
  },

  memberActivate (memberId) {
    return API.apiClient.put('/group-members/' + memberId + '/activate')
  },
  memberBlock (memberId) {
    return API.apiClient.put('/group-members/' + memberId + '/block')
  },
  memberChangeRole (payload) {
    return API.apiClient.put('/group-members/' + payload.memberId + '/change-member-role', payload.data)
  },
  memberCreate (payload) {
    return API.apiClient.post('/groups/' + payload.groupId + '/new-member', payload.data)
  },
  memberRemove (memberId) {
    return API.apiClient.delete('/group-members/' + memberId)
  },
  memberUpdateSettings (payload) {
    return API.apiClient.put('/group-members/' + payload.memberId + '/update-settings', payload.data)
  }

}
