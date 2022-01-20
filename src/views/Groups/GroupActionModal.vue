<template>
<div class="modal fade" id="groupActionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="groupActionModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="groupActionModalLabel">Group</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="text-center">
          <h5>{{group.name}}</h5>
        </div>
        <p class="text-center">
          <h5>{{group.description}}</h5>
        </p>
        <hr/>
        <p class="text-center">{{currentState}}</p>
        <hr/>
        <div class="d-grid gap-2">
          <button v-if="requestToJoin" class="btn btn-success" type="button" @click="processRequest('requestToJoin', 'Requesting To Join the group')">Join Group</button>
          <button v-if="cancelRequestToJoin" class="btn btn-success" type="button" @click="processRequest('cancelRequestToJoin', 'Cancelling Join Request')">Cancel Join Request</button>
          <button v-if="leaveGroup" class="btn btn-danger" type="button" @click="processRequest('leaveGroup', 'Leaving the Group')">Leave</button>
          <button v-if="activateGroup" class="btn btn-danger" type="button" @click="processRequest('activateGroup', 'Setting Group State to Active')">Activate</button>
          <button v-if="deactivateGroup" class="btn btn-warning" type="button" @click="processRequest('deactivateGroup', 'Setting Group State to Inactive')">Deactivate</button>
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
  name: 'GroupActionModal',

  components: {
    FlashMessage
  },

  props: {
    group: { type: Object, required: true },
    action: { type: String, required: true }
  },

  data () {
    return {
      modalName: 'groupActionModal',
      avatarLocation: fileLocations.groupPhoto,
      requestToJoin: null,
      cancelRequestToJoin: false,
      leaveGroup: false,
      activateGroup: false,
      deactivateGroup: false,
      message: null,
      msgType: null
    }
  },

  computed: {
    ...mapGetters('auth', ['authUser']),
    ...mapGetters('group', ['error'])
  },

  watch: {
    'action': function (newVal, oldVal) {

      this.requestToJoin = false
      this.cancelRequestToJoin = false
      this.leaveGroup = false
      this.activateGroup = false
      this.deactivateGroup = false

      switch (action) {
        case 'requestToJoin':
          this.requestToJoin = true
          this.currentState = ""
          break
        case 'cancelRequestToJoin':
          this.cancelRequestToJoin = true
          this.currentState = 'Your request to join the group is still pending approval'
          break
        case 'leaveGroup':
          this.leaveGroup = true
          this.currentState = ""
          break
        case 'activateGroup':
          this.activateGroup = true
          this.currentState = 'The group was deactivated on ' + this.group.status_changed_at.substring(0, 10) + ' at ' + this.group.status_changed_at.substring(11)
          break
        case 'deactivateGroup':
          this.deactivateGroup = true
          this.currentState = ""
          break
      }
    }
  },

  mounted () {
    this.$emit('register-modal', this.modalName)
  },

  methods: {
    ...mapActions('group', ['createGroupMember', 'removeGroupMember', 'flipActiveState']),

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
