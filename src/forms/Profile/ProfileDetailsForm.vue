<template>
  <form @submit.prevent="updateProfile">

    <h5 class="hd-style">Main Details</h5>
    <hr>
    <InputText
      name="name"
      placeholder="full name"
      v-model="name"
      labelText="Full Name"
      layout-class="bg-soft-light"
      :externalErrors="externalErrors"
      :server-request-in-progress="serverRequestInProgress"
      validation-rules="required">
    </InputText>

    <div class="mt-4 text-center">
      <button class="btn" :class="name == authUser.name ? 'btn-secondary btn-sm' : 'btn-primary'" type="submit" :disabled="serverRequestInProgress || name == authUser.name">Save</button>
    </div>
    <FlashMessage :message="message" :msg-type="msgType" @clear-message="message = null" />
  </form>
</template>

<script>

import { mapGetters } from "vuex"
import InputText from "@/components/InputElements/InputText"
import FlashMessage from "@/components/FlashMessage"
import AuthService from "@/services/AuthService"

export default {
  name: "ProfileDetailsForm",
  components: {
    InputText,
    FlashMessage
  },
  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null,
      message: null,
      msgType: null,
      name: "",
      email: null
    }
  },
  computed: {
    ...mapGetters("auth", ["authUser"])
  },
  mounted () {
    this.name = this.authUser.name
    this.email = this.authUser.email
  },
  methods: {
    updateProfile () {
      this.error = null
      this.serverRequestInProgress = true
      const payload = {
        name: this.name
      }
      /* eslint-disable */
      AuthService.updateMyProfile(payload)
        .then((response) => {
          this.message = response.data.status_details
          this.msgType = "success"
          this.externalErrors = null
        })
        .then(() => this.$store.dispatch("auth/getAuthUser"))
        .catch((error) => {
          this.externalErrors = error.response.data.data_errors
        })
        .finally(this.serverRequestInProgress = false)
      /* eslint-enable */
    }
  }
}
</script>
