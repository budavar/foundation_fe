<template>
  <form @submit.prevent="changePassword">

    <InputPassword
      name="current_password"
      v-model="current_password"
      labelText="Current Password"
      layout-class="bg-soft-light"
      :externalErrors="externalErrors"
      :server-request-in-progress="serverRequestInProgress"
      validation-rules="required">
    </InputPassword>

    <InputPassword
      name="password"
      v-model="password"
      labelText="Password"
      layout-class="bg-soft-light"
      :externalErrors="externalErrors"
      :server-request-in-progress="serverRequestInProgress"
      validation-rules="required">
    </InputPassword>

    <InputPassword
      name="password-confirm"
      v-model="passwordConfirm"
      labelText="Confirm Password"
      layout-class="bg-soft-light"
      :externalErrors="externalErrors"
      :server-request-in-progress="serverRequestInProgress"
      validation-rules="required">
    </InputPassword>

    <div class="mt-4">
      <div class="d-grid gap-2">
        <button
          class="btn"
          :class="dataNotEntered() ? 'btn-secondary' : 'btn-primary'"
          type="submit"
          :disabled="serverRequestInProgress || dataNotEntered()">Submit</button>
      </div>
    </div>
    <FlashMessage :message="message" @clear-message="message = null" />
  </form>
</template>

<script>
import AuthService from "@/services/AuthService"
import InputPassword from "@/components/InputElements/InputPassword"
import FlashMessage from "@/components/FlashMessage"

export default {
  name: "ChangePasswordForm",
  components: {
    InputPassword,
    FlashMessage
  },
  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null,
      message: null,
      msgType: null,
      current_password: "",
      password: "",
      passwordConfirm: ""
    }
  },
  methods: {
    changePassword () {
      this.serverRequestInProgress = true
      const payload = {
        current_password: this.current_password,
        password: this.password,
        password_confirmation: this.passwordConfirm
      }
      /* eslint-disable */
      AuthService.updatePassword(payload)
        .then(() => {
          this.message = 'Password successfully changed'
          this.current_password = ""
          this.password = ""
          this.passwordConfirm = ""
        })
        .catch((error) => (this.externalErrors = error.response.data.errors))
        .finally(this.serverRequestInProgress = false)
      /* eslint-enable */
    },
    dataNotEntered () {
      if (this.current_password === "" || this.password === "" || this.passwordConfirm === "") {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
