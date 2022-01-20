<template>
  <form @submit.prevent="registerUser">

    <InputText
      name="name"
      placeholder="full name"
      v-model="name"
      labelText="Full Name"
      layout-class="bg-soft-light form-control-lg rounded-lg"
      :externalErrors="externalErrors"
      :server-request-in-progress="serverRequestInProgress"
      validation-rules="required">
    </InputText>

    <InputEmail
      name="email"
      placeholder="name@domain.com"
      v-model="email"
      labelText="Email"
      layout-class="bg-soft-light input-group-lg rounded-lg"
      :externalErrors="externalErrors"
      :server-request-in-progress="serverRequestInProgress"
      validation-rules="required">
    </InputEmail>

    <InputPassword
      name="password"
      v-model="password"
      labelText="Password"
      layout-class="bg-soft-light input-group-lg rounded-lg"
      :externalErrors="externalErrors"
      :server-request-in-progress="serverRequestInProgress"
      validation-rules="required">
    </InputPassword>

    <InputPassword
      name="password-confirm"
      v-model="passwordConfirm"
      labelText="Confirm Password"
      layout-class="bg-soft-light input-group-lg rounded-lg"
      :externalErrors="externalErrors"
      :server-request-in-progress="serverRequestInProgress"
      validation-rules="required">
    </InputPassword>

    <div class="mt-4">
      <div class="d-grid gap-2">
        <button class="btn btn-primary" type="submit" :disabled="serverRequestInProgress">Submit</button>
      </div>
    </div>
  </form>
</template>

<script>
import AuthService from "@/services/AuthService"
import InputEmail from "@/components/InputElements/InputEmail"
import InputPassword from "@/components/InputElements/InputPassword"
import InputText from "@/components/InputElements/InputText"

export default {
  name: "RegisterForm",
  components: {
    InputEmail,
    InputPassword,
    InputText
  },
  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null,
      name: "",
      email: "",
      password: "",
      passwordConfirm: ""
    }
  },
  methods: {
    registerUser () {
      this.error = null
      this.serverRequestInProgress = true
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirm
      }
      /* eslint-disable */
      AuthService.registerUser (payload)
        .then(() => this.$router.push("/dashboard"))
        .catch((error) => {this.externalErrors = error.response.data.errors})
        .finally(this.serverRequestInProgress = false)
      /* eslint-enable */
    }
  }
}
</script>
