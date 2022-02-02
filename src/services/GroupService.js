import * as API from "@/services/API"

export default {
  create (payload) {
    return API.apiClient.post('/groups', payload)
  },
  getGroup (payload) {
    return API.apiClient.get(`/groups/` + payload)
  },
  myGroups () {
    return API.apiClient.get(`/groups`)
  },
  update (id, payload) {
    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
        boundary: payload._boundary
      }
    }
    return API.apiClient.post('/groups/' + id, payload, config)
  }
}
