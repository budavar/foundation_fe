<template>
  <div>
    <h5 class="hd-style">Group Settings</h5>
    <div v-if="getGroup.status === 'active'" class="ms-5">
      <h6 class="attr-label-style mt-3 mb-0">Close the Group</h6>
      <p>Closing the group will prevent any future additions to posts, events, comments or other group activities by the members.  The group and its contents will remain visible to all active members.  Any users with a membershup status of 'Invited' or 'Requested' to join will be notified of the group status change and the invite/request will be deleted.</p>
      <form @submit.prevent="closeOpen">
        <InputCheckBox
          name="closeGroup"
          v-model:checked="closeGroup"
          label="Check to confirm closeure of the group"
          layout-class="bg-soft-light"
          :server-request-in-progress="serverRequestInProgress">
        </InputCheckBox>
        <div class="mt-4 mb-4 text-center">
          <button
            class="btn"
            :class="closeGroup ? 'btn-danger' : 'btn-outline-danger'"
            type="submit"
            :disabled="serverRequestInProgress || !closeGroup">Close Group</button>
        </div>
        <FlashMessage :message="message" :msg-type="msgType" @clear-message="message = null" />
      </form>
    </div>
    <div v-if="getGroup.status === 'closed'" class="ms-5">
      <h6 class="attr-label-style mt-3 mb-0">Open the Group</h6>
      <p>Opening the group will enable all activiities for members of the group.  A notification will be sent to all members informing them of re-opening"</p>
      <form @submit.prevent="closeOpen">
        <InputCheckBox
          name="openGroup"
          v-model:checked="openGroup"
          label="Check to confirm re-opening of the group"
          layout-class="bg-soft-light"
          :server-request-in-progress="serverRequestInProgress">
        </InputCheckBox>
        <div class="mt-4 mb-4 text-center">
          <button
            class="btn"
            :class="openGroup ? 'btn-success' : 'btn-outline-success'"
            type="submit"
            :disabled="serverRequestInProgress || !openGroup">Open Group</button>
        </div>
        <FlashMessage :message="message" :msg-type="msgType" @clear-message="message = null" />
      </form>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import InputCheckBox from '@/components/InputElements/InputCheckBox'
import FlashMessage from '@/components/FlashMessage'

export default {
  name: "GroupSettings",

  components: {
    InputCheckBox,
    FlashMessage
  },

  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null,
      closeGroup: false,
      openGroup: false,
      message: null,
      msgType: null
    }
  },

  computed: {
    ...mapGetters('group', ['getGroup'])
  },

  methods: {
    ...mapActions('group', ['closeOpenGroup']),

    closeOpen () {
      this.serverRequestInProgress = true
      const payload = {
        groupId: this.getGroup.id,
        action: this.getGroup.status === 'active' ? 'close' : 'open'
      }
      this.closeOpenGroup(payload)
        .then(response => {
          this.serverRequestInProgress = false
          this.closeGroup = false
          this.openGroup = false
          this.$emit('settings-updated')
        })
        .catch(error => {
          this.externalErrors = error.response.data.data_errors
          this.message = 'Unexpected error updating the member settings'
          this.msgType = 'danger'
          this.serverRequestInProgress = false
        })
    }
  }
}
</script>
