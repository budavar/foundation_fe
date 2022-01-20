<template>
<div class="modal fade" id="friendActionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="friendActionModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="friendActionLabel">Friend Management</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <div class="d-flex justify-content-center pb-3">
          <div>
            <Avatar
              :username="friend.name"
              :src="friend.avatar == null ? null : avatarLocation + friend.avatar"
              :rounded="friend.avatar == null ? true : false"
              :size=200>
            </Avatar>
          </div>
        </div>
        <div class="text-center">
          <h5>{{friend.name}}</h5>
        </div>
        <hr/>
        <p class="text-center">{{currentState}}</p>
        <hr/>
        <div class="d-grid gap-2">
          <button v-if="showAccept" class="btn btn-success" type="button" @click="processRequest('setRequestToAccept', 'Accepting')">Accept</button>
          <button v-if="showUnblock" class="btn btn-success" type="button" @click="processRequest('setRequestToAccept', 'Unblocking')">Unblock</button>
          <button v-if="showDecline" class="btn btn-danger" type="button" @click="processRequest('deleteRequest', 'Decliningg')">Decline</button>
          <button v-if="showRemove" class="btn btn-danger" type="button" @click="processRequest('deleteRequest', 'Deleting')">Remove</button>
          <button v-if="showBlock" class="btn btn-warning" type="button" @click="processRequest('setRequestToBlock', 'Blocking')">Block</button>
          <button class="btn btn-outline-secondary" type="button" data-bs-dismiss="modal">cancel</button>
        </div>
        <FlashMessage :message="message" :msg-type="msgType" @clear-message="message = null" />
      </div>
    </div>
  </div>
</div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import Avatar from '@/components/Avatar'
import FlashMessage from '@/components/FlashMessage'
import { fileLocations } from "@/config/BaseConfig"

export default {
  name: 'FriendActionModal',

  components: {
    Avatar,
    FlashMessage
  },

  props: {
    friend: { type: Object, required: true }
  },

  data () {
    return {
      modalName: 'friendActionModal',
      avatarLocation: fileLocations.avatars,
      currentState: null,
      showAccept: false,
      showUnblock: false,
      showDecline: false,
      showRemove: false,
      showBlock: false,
      message: null,
      msgType: null
    }
  },

  computed: {
    ...mapGetters('auth', ['authUser']),
    ...mapGetters('friend', ['error'])
  },

  watch: {
    'friend.status': function (newVal, oldVal) {
      this.showAccept = false
      this.showUnblock = false
      this.showDecline = false
      this.showRemove = false
      this.showBlock = false

      switch (newVal) {
        case 'accepted':
          this.showRemove = true
          this.showBlock = true
          if (this.friend.requester_id === this.authUser.id) {
            this.currentState = 'You accepted ' + this.friend.name + "'s friend request on " + this.friend.updated_at.substring(0, 10) + ' at ' + this.friend.updated_at.substring(11)
          } else {
            this.currentState = this.friend.name + ' accepted your friend request on ' + this.friend.updated_at.substring(0, 10) + ' at ' + this.friend.updated_at.substring(11)
          }
          break
        case 'blocked':
          this.showRemove = true
          this.showAccept = true
          this.currentState = 'You blocked ' + this.friend.name + ' on ' + this.friend.updated_at.substring(0, 10) + ' at ' + this.friend.updated_at.substring(11)
          break
        case 'requested':
          if (this.friend.requester_id === this.authUser.id) {
            this.showRemove = true
            this.currentState = 'You sent ' + this.friend.name + ' a friend request on ' + this.friend.updated_at.substring(0, 10) + ' at ' + this.friend.updated_at.substring(11)
          } else {
            this.showAccept = true
            this.showDecline = true
            this.showBlock = true
            this.currentState = this.friend.name + ' sent you a friend request on ' + this.friend.updated_at.substring(0, 10) + ' at ' + this.friend.updated_at.substring(11)
          }
          break
      }
    }
  },

  mounted () {
    this.$emit('register-modal', this.modalName)
  },

  methods: {
    ...mapActions('friend', ['setRequestToAccept', 'setRequestToBlock', 'deleteRequest']),

    processRequest (realAction, userAction) {
      this[realAction](this.friend.friend_resource_id)
        .then(response => {
          this.$emit('close-modal', this.modalName)
        })
        .catch(response => {
          console.log(this.error)
          this.message = 'Unexpected error ' + userAction + ' friend request'
          this.msgType = 'danger'
        })
    }
  }
}
</script>
