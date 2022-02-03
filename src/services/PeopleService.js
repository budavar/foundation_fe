import * as API from "@/services/API"

export default {
  searchUsers (payload) {
    return API.apiClient.get(`/people/search`, { params: payload })
  },
  getMyFriends (payload) {
    return API.apiClient.get(`/people/my-friends`, { params: payload })
  }
}
