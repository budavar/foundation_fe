<template>
  <form @submit.prevent="updateMember">
    <label for="mute_notifications" class="input-label-style">
      Mute Notifications
    </label>
    <p :class="'mt-1 mb-1 ' + mutedCommentClass">
      <font-awesome-icon icon="info-circle" class="me-1" />
      {{mutedComment}}
    </p>
    <InputRadio
      name="mute_notifications"
      v-model="mute_notifications"
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
import moment from "moment"
import InputRadio from "@/components/InputElements/InputRadio"
import FlashMessage from "@/components/FlashMessage"

export default {
  name: "MemberSettingsForm",

  components: {
    InputRadio,
    FlashMessage
  },

  computed: {
    ...mapGetters('group', ['getGroup', 'error']),

    mutedComment () {
      switch (this.getGroup.my_member.mute_notifications) {
        case 'do-not-mute':
          return 'Notifications are not current muted.'
        case 'one-week':
          return 'Notifications were muted for a week.  They will resume at ' + moment(this.getGroup.my_member.mute_notifications_until).format('h:mm a on MMMM Do YYYY')
        case 'one-month':
          return 'Notifications were muted for a month.  They will resume at ' + moment(this.getGroup.my_member.mute_notifications_until).format('h:mm a on MMMM Do YYYY')
        case 'always':
          return 'Notifications have been permanently muted'
        default:
          return 'UNknown Mute Notifications state'
      }
    },

    mutedCommentClass () {
      switch (this.getGroup.my_member.mute_notifications) {
        case 'do-not-mute':
          return "text-success"
        case 'one-week':
          return "text-info"
        case 'one-month':
          return "text-info"
        case 'always':
          return "text-danger"
        default:
          return ""
      }
    }
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
