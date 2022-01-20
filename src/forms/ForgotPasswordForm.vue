<template>
  <form @submit.prevent="reset">
    <InputEmail
      name="email"
      placeholder="name@domain.com"
      v-model="email"
      layout-class="bg-soft-light input-group-lg rounded-lg"
      labelText="Email"
      autocomplete="email"
      :externalErrors="externalErrors"
      :server-request-in-progress="serverRequestInProgress"
      validation-rules="required">
    </InputEmail>

    <div class="mt-4">
      <div class="d-grid gap-2">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </div>

  </form>
</template>

<script>
import AuthService from "@/services/AuthService"
import InputEmail from "@/components/InputElements/InputEmail"

// https://stackoverflow.com/questions/66485790/how-to-ratelimit-forgot-password-requests-in-laravel-fortify

export default {
  name: "ForgotPassword",
  components: {
    InputEmail
  },
  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null,
      email: ""
    }
  },
  methods: {
    reset () {
      const payload = {
        email: this.email
      }
      AuthService.forgotPassword(payload)
        .then(() => (this.message = "Reset password email sent."))
        .catch((error) => (
          this.externalErrors = error.response.data.errors
        ))
    }
  }
}
</script>
