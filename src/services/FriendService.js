import * as API from "@/services/API"

export default {
  getFriends () {
    return API.apiClient.get(`/friends`)
  },
  search (searchString) {
    return API.apiClient.get(`/friends/search`, { params: { searchString: searchString } })
  },
  sendFriendRequest (payload) {
    return API.apiClient.post('/friends', payload)
  },
  accept (friendId) {
    return API.apiClient.put('/friends/accept/' + friendId)
  },
  block (friendId) {
    return API.apiClient.put('/friends/block/' + friendId)
  },
  delete (friendId) {
    return API.apiClient.delete('/friends/delete/' + friendId)
  }
}
