<template>
<div class="modal fade" id="memberAdminModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="memberAdminModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="memberAdminModalLabel">Member Management</h5>
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
          <button v-if="showAccept" class="btn btn-success" type="button" @click="processRequest('activateGroupMember', 'Accepting')">{{member.status === 'blocked' ? 'Unblock' : 'Accept'}}</button>
          <button v-if="showUnblock" class="btn btn-success" type="button" @click="processRequest('activateGroupMember', 'Unblocking')">Unblock</button>
          <button v-if="showDecline" class="btn btn-danger" type="button" @click="processRequest('removeGroupMember', 'Decliningg')">Decline</button>
          <button v-if="showRemove" class="btn btn-danger" type="button" @click="processRequest('removeGroupMember', 'Deleting')">Remove</button>
          <button v-if="showBlock" class="btn btn-warning" type="button" @click="processRequest('blockGroupMember', 'Blocking')">Block</button>
          <button v-if="showMakeAdmin" class="btn btn-primary" type="button" @click="processRequest('changeMemberRole', 'Changing Role to Admin', 'admin')">Make Admin</button>
          <button v-if="showMakeMember" class="btn btn-primary" type="button" @click="processRequest('changeMemberRole', 'Changing Role to Member', 'member')">Remove Admin</button>
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
      showMakeAdmin: false,
      showMakeMember: false,
      message: null,
      msgType: null
    }
  },

  computed: {
    ...mapGetters('auth', ['authUser']),
    ...mapGetters('group', ['error'])
  },

  watch: {
    'member.status': {
      immediate: true,
      handler (newVal, oldVal) {
        this.setCurrentState(newVal)
      }
    },
    'member.role': {
      immediate: true,
      handler (newVal, oldVal) {
        this.showMakeMember = false
        this.showMakeAdmin = false
        if (newVal === 'member') {
          this.showMakeAdmin = true
        }
        if (newVal === 'admin') {
          this.showMakeMember = true
        }
      }
    }
  },

  mounted () {
    this.$emit('register-modal', this.modalName)
  },

  methods: {
    ...mapActions('group', ['activateGroupMember', 'blockGroupMember', 'removeGroupMember', 'changeMemberRole']),

    processRequest (realAction, userAction, changeToRole = null) {
      const payload = {
        groupId: this.member.group_id,
        memberId: this.member.id,
        action: 'member-management',
        data: {
          change_to_role: changeToRole
        }
      }
      this[realAction](payload)
        .then(response => {
          this.$emit('close-modal', this.modalName)
        })
        .catch(response => {
          console.log(this.error)
          this.message = 'Unexpected error ' + userAction + ' friend request'
          this.msgType = 'danger'
        })
    },

    setCurrentState (memberStatus) {
      this.showAccept = false
      this.showUnblock = false
      this.showDecline = false
      this.showRemove = false
      this.showBlock = false

      if (this.member.role === 'owner') {
        this.currentState = this.member.user.name + ' is the group owner and cannot be managed via this option.  To change owner, please select the Group Change Owner Option.  You must be the Group Owner access this action.'
        return
      }

      switch (memberStatus) {
        case 'active':
          this.showRemove = true
          this.showBlock = true
          this.currentState = this.member.user.name + ' joined the group on ' + this.member.updated_at.substring(0, 10) + ' at ' + this.member.updated_at.substring(11, 16)
          break
        case 'blocked':
          this.showRemove = true
          this.showAccept = true
          this.currentState = this.member.user.name + ' was blocked on ' + this.member.updated_at.substring(0, 10) + ' at ' + this.member.updated_at.substring(11, 16)
          break
        case 'invited':
          this.showRemove = true
          this.currentState = this.member.user.name + ' was invited to join the group on ' + this.member.updated_at.substring(0, 10) + ' at ' + this.member.updated_at.substring(11, 16)
          break
        case 'requested':
          this.showAccept = true
          this.showDecline = true
          this.showBlock = true
          this.currentState = this.member.user.name + ' sent request to join the group on ' + this.member.updated_at.substring(0, 10) + ' at ' + this.member.updated_at.substring(11, 16)
          break
      }
    }
  }
}
</script>
