<template>
<div class="modal fade" id="groupSummaryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="groupSummaryModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="groupSummaryModalLabel">Group</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="text-center">
          <h5>{{group.name}}</h5>
        </div>
        <p class="text-center">
          {{group.description}}
        </p>
        <hr/>
        <p class="text-center">{{currentState}}</p>
        <hr/>
        <div class="d-grid gap-2">
          <button v-if="requestToJoin" class="btn btn-primary" type="button" @click="processRequest('createGroupMember', 'Requesting To Join the group')">Join Group</button>
          <button v-if="acceptInviteToJOin" class="btn btn-success" type="button" @click="processRequest('updateGroupMember', 'Accepting Invitation to Join Group')">Accept Invite</button>
          <button v-if="cancelRequestToJoin" class="btn btn-danger" type="button" @click="processRequest('deleteGroupMember', 'Cancelling Join Request')">Cancel Join Request</button>
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
import FlashMessage from '@/components/FlashMessage'
import { fileLocations } from "@/config/BaseConfig"

export default {
  name: 'GroupSummaryModal',

  components: {
    FlashMessage
  },

  props: {
    group: { type: Object, required: true },
    memberAction: { type: String, required: true }
  },

  data () {
    return {
      modalName: 'groupSummaryModal',
      avatarLocation: fileLocations.groupPhoto,
      requestToJoin: null,
      cancelRequestToJoin: false,
      acceptInviteToJOin: false,
      message: null,
      msgType: null
    }
  },

  computed: {
    ...mapGetters('auth', ['authUser']),
    ...mapGetters('group', ['error'])
  },

  watch: {
    memberAction: function (newVal, oldVal) {
      this.requestToJoin = false
      this.cancelRequestToJoin = false
      this.acceptInviteToJOin = false

      switch (newVal) {
        case 'requestToJoin':
          this.requestToJoin = true
          this.currentState = ""
          break
        case 'cancelRequestToJoin':
          this.cancelRequestToJoin = true
          this.currentState = 'Your request to join the group is still pending approval'
          break
        case 'acceptInviteToJOin':
          this.acceptInviteToJOin = true
          this.currentState = ""
          break
      }
    }
  },

  mounted () {
    this.$emit('register-modal', this.modalName)
  },

  methods: {
    ...mapActions('group', ['createGroupMember', 'removeGroupMember', 'updateGroupMember']),

    processRequest (realAction, userAction) {
      this[realAction](this.friend.friend_resource_id)
        .then(response => {
          this.$emit('close-modal', this.modalName)
        })
        .catch(response => {
          console.log(this.error)
          this.message = 'Unexpected error ' + userAction
          this.msgType = 'danger'
        })
    }
  }
}
</script>
