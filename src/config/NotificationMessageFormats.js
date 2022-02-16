export const NotificationMessages = {
  actionTypes: {
    friendRequestReceived: {
      formatRule: 'basic',
      text: '#actionUserName sent you a friend request'
    },
    friendRequestAccepted: {
      formatRule: 'basic',
      text: '#actionUserName accepted your friend request'
    },
    friendRequestOutstanding: {
      formatRule: 'basic',
      text: 'You have outstanding friend requests'
    },
    groupCLosed: {
      formatRule: 'basic',
      text: '#actionUserName closed group #groupName'
    },
    groupOpened: {
      formatRule: 'basic',
      text: '#actionUserName reopened group #groupName'
    },
    groupNameChange: {
      formatRule: 'basic',
      text: '#actionUserName renamed group #groupOldName to #groupNewName'
    },
    groupJoinRequestsOutstanding: {
      formatRule: 'basic',
      text: 'There are pending requests to join group #groupName'
    },
    groupInviteReceived: {
      formatRule: 'basic',
      text: 'You have been invited by #actionUserName to join group #groupName'
    },
    groupJoinRequestAccepted:  {
      formatRule: 'basic',
      text: 'Your request to join group #groupName has been approved'
    }
  },
  notificationFormatRules: {
    basic: '<span>#</span>',
    danger: '<span>#</span>',
  },
  attrFormatRules: {
    basic: '<strong>#</strong>',
    groupOldName: '<strong class="text-danger">#</strong>',
    groupNewName: '<strong class="text-success">#</strong>'
  }
}
