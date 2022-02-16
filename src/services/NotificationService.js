import * as API from "@/services/API"

export default {

  delete (notificationId) {
    return API.apiClient.delete('/notifications/' + notificationId)
  },

  list (payload) {
    return API.apiClient.get('/notifications', { params: payload })
  },

  markAllAsRead () {
    return API.apiClient.delete('/notifications/mark-all-as-read')
  },

  markAsRead (notificationId) {
    return API.apiClient.delete('/notifications/' + notificationId + '/mark-as-read')
  }

}
