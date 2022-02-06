<template>
<div class="modal fade" id="groupSummaryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="groupSummaryModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="groupSummaryModalLabel">{{group.name}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img v-if="group.photo === null" src="https://via.placeholder.com/480x270.png" class="w-100">
        <img v-else :src="photoLocation + group.photo" class="w-100">
        <p class="text-center mt-2">
          {{group.description}}
        </p>
        <hr v-if="currentState != null"/>
        <p class="text-center">{{currentState}}</p>
        <hr/>
        <div class="d-grid gap-2">
          <button v-if="requestToJoin" class="btn btn-primary" type="button" @click="processRequest('createGroupMember', 'Requesting To Join the group')">Join Group</button>
          <button v-if="acceptInviteToJoin" class="btn btn-success" type="button" @click="processRequest('activateGroupMember', 'Accepting Invitation to Join Group')">Accept Invite</button>
          <button v-if="acceptInviteToJoin" class="btn btn-danger" type="button" @click="processRequest('removeGroupMember', 'Decling Invitation to Join Group')">Decline Invite</button>
          <button v-if="cancelRequestToJoin" class="btn btn-danger" type="button" @click="processRequest('removeGroupMember', 'Cancelling Join Request')">Cancel Join Request</button>
          <button class="btn btn-outline-secondary" type="button" data-bs-dismiss="modal">cancel</button>
        </div>
        <FlashMessage :message="message" :msg-type="msgType" @clear-message="message = null" />
      </div>
    </div>
  </div>
</div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'
import FlashMessage from '@/components/FlashMessage'
import { fileLocations } from "@/config/BaseConfig"

export default {
  name: 'GroupSummaryModal',

  components: {
    FlashMessage
  },

  props: {
    group: { type: Object, required: true }
  },

  data () {
    return {
      modalName: 'groupSummaryModal',
      photoLocation: fileLocations.groups,
      message: null,
      msgType: null
    }
  },

  computed: {

    ...mapGetters('auth', ['authUser']),

    requestToJoin () {
      if (this.group.my_member === null) {
        return true
      } else {
        return false
      }
    },
    cancelRequestToJoin () {
      if (this.group.my_member !== null && this.group.my_member.status === 'requested') {
        return true
      } else {
        return false
      }
    },
    acceptInviteToJoin () {
      if (this.group.my_member !== null && this.group.my_member.status === 'invited') {
        return true
      } else {
        return false
      }
    },
    currentState () {
      if (this.group.my_member !== null && this.group.my_member.status === 'requested') {
        return 'Your request to join the group is still pending approval'
      } else {
        return null
      }
    }
  },

  mounted () {
    this.$emit('register-modal', this.modalName)
  },

  methods: {
    ...mapActions('group', ['createGroupMember', 'removeGroupMember', 'activateGroupMember']),

    processRequest (realAction, userAction) {
      let payload = {}
      if (realAction === 'createGroupMember') {
        payload = {
          groupId: this.group.id,
          action: 'personal',
          data: {
            user_id: this.authUser.id
          }
        }
      } else {
        payload = {
          groupId: this.group.id,
          memberId: this.group.my_member.id,
          action: 'personal'
        }
      }

      this[realAction](payload)
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
