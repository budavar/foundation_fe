import * as API from "@/services/API"

export default {
  myGroups () {
    return API.apiClient.get(`/groups`)
  },
  search (searchString) {
    return API.apiClient.get(`/groups/search`, { params: { searchString: searchString } })
  },
  create (payload) {
    return API.apiClient.post('/groups', payload)
  }
}
