<template>
<div class="modal fade" id="MemberAdminModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="MemberAdminModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="MemberAdminModalLabel">Member Management</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="d-flex justify-content-center pb-3">
          <div>
            <Avatar
              :username="member.user.name"
              :src="member.user.avatar == null ? null : avatarLocation + member.user.avatar"
              :rounded="member.user.avatar == null ? true : false"
              :size=200>
            </Avatar>
          </div>
        </div>
        <div class="text-center">
          <h5>{{member.user.name}}</h5>
        </div>
        <hr/>
        <p class="text-center">{{currentState}}</p>
        <hr/>
        <div class="d-grid gap-2">
          <button v-if="showAccept" class="btn btn-success" type="button" @click="processRequest('acceptMember', 'Accepting')">Accept</button>
          <button v-if="showUnblock" class="btn btn-success" type="button" @click="processRequest('acceptMember', 'Unblocking')">Unblock</button>
          <button v-if="showDecline" class="btn btn-danger" type="button" @click="processRequest('deleteMember', 'Decliningg')">Decline</button>
          <button v-if="showRemove" class="btn btn-danger" type="button" @click="processRequest('deleteMember', 'Deleting')">Remove</button>
          <button v-if="showBlock" class="btn btn-warning" type="button" @click="processRequest('blockMember', 'Blocking')">Block</button>
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
  name: 'MemberAdminModal',

  components: {
    Avatar,
    FlashMessage
  },

  props: {
    member: { type: Object, required: true }
  },

  data () {
    return {
      modalName: 'memberAdminModal',
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
    ...mapGetters('group', ['error'])
  },

  watch: {
    'member.status': function (newVal, oldVal) {
      this.showAccept = false
      this.showUnblock = false
      this.showDecline = false
      this.showRemove = false
      this.showBlock = false

      switch (newVal) {
        case 'active':
          this.showRemove = true
          this.showBlock = true
          this.currentState = this.member.name + ' joined the group on' + this.member.updated_at.substring(0, 10) + ' at ' + this.member.updated_at.substring(11)
          break
        case 'blocked':
          this.showRemove = true
          this.showAccept = true
          this.currentState = this.member.name + ' was blocked on ' + this.member.updated_at.substring(0, 10) + ' at ' + this.member.updated_at.substring(11)
          break
        case 'invited':
          this.showRemove = true
          this.currentState = this.member.name + ' was invited to join the group on ' + this.member.updated_at.substring(0, 10) + ' at ' + this.member.updated_at.substring(11)
          break
        case 'requested':
          this.showAccept = true
          this.showDecline = true
          this.showBlock = true
          this.currentState = this.member.name + ' sent request to join the group on ' + this.member.updated_at.substring(0, 10) + ' at ' + this.member.updated_at.substring(11)
          break
      }
    }
  },

  mounted () {
    this.$emit('register-modal', this.modalName)
  },

  methods: {
    ...mapActions('group', ['acceptMember', 'blockMember', 'deleteMember']),

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
