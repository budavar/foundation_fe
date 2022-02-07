<template>
  <form @submit.prevent="updateMember">
    <InputRadio
      name="mute_notifications"
      v-model="mute_notifications"
      labelText="Mute Notifications"
      layout-class="bg-soft-light"
      radio-layout="vertical"
      :radio-options="[
          { 'value' : 'do-not-mute', 'label' : 'Do not mute'},
          { 'value' : 'one-week', 'label' : 'For one week'},
          { 'value' : 'one-month', 'label' : 'For one month'},
          { 'value' : 'always', 'label' : 'No notifications'}
        ]"
      :externalErrors="[]"
      :validation-rules="[]"
      :server-request-in-progress="serverRequestInProgress">
    </InputRadio>

    <div class="mt-4 mb-4 text-center">
      <button
        class="btn btn-primary"
        type="submit"
        :disabled="serverRequestInProgress">Save Settings</button>
    </div>
    <FlashMessage :message="message" :msg-type="msgType" @clear-message="message = null" />
  </form>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import InputRadio from "@/components/InputElements/InputRadio"
import FlashMessage from "@/components/FlashMessage"

export default {
  name: "MemberSettingsForm",

  components: {
    InputRadio,
    FlashMessage
  },

  computed: {
    ...mapGetters('group', ['getGroup', 'error'])
  },

  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null,
      mute_notifications: "none",
      message: null,
      msgType: null
    }
  },

  watch: {
    'getGroup.id': {
      immediate: true,
      handler (newVal, oldVal) {
        if (this.getGroup !== {}) {
          this.mute_notifications = this.getGroup.my_member.mute_notifications
        }
      }
    }
  },

  methods: {

    ...mapActions('group', ['updateMemberSettings']),

    updateMember () {
      this.serverRequestInProgress = true
      const payload = {
        groupId: this.getGroup.id,
        memberId: this.getGroup.my_member.id,
        data: {
          mute_notifications: this.mute_notifications
        }
      }
      this.updateMemberSettings(payload)
        .then(response => {
          this.serverRequestInProgress = false
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
