<template>
  <form @submit.prevent="login">
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

    <InputPassword
      name="password"
      v-model="password"
      labelText="Password"
      autocomplete="password"
      layout-class="bg-soft-light input-group-lg rounded-lg"
      :externalErrors="externalErrors"
      :server-request-in-progress="serverRequestInProgress"
      validation-rules="required">
    </InputPassword>

    <p class="text-center">
      <router-link to="/auth/forgot-password" class="text-sm text-primary">
        Forgot your password?
      </router-link>
    </p>

    <div class="mt-4">
      <div class="d-grid gap-2">
        <button class="btn btn-primary" type="submit">Sign In</button>
      </div>
    </div>
  </form>
</template>

<script>
import AuthService from "@/services/AuthService"
import InputEmail from "@/components/InputElements/InputEmail"
import InputPassword from "@/components/InputElements/InputPassword"

export default {
  name: "LoginView",
  components: {
    InputEmail,
    InputPassword
  },
  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null,
      email: "",
      password: ""
    }
  },
  methods: {
    async login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.error = null
      try {
        await AuthService.login(payload)
        const authUser = await this.$store.dispatch("auth/getAuthUser")
        if (authUser) {
          this.$store.dispatch("auth/setGuest", { value: "isNotGuest" })
          this.$router.push("/dashboard")
        } else {
          const error = Error(
            "Unable to fetch user after login, check your API settings."
          )
          error.name = "Fetch User"
          throw error
        }
      } catch (error) {
        this.externalErrors = error.response.data.errors
      }
    }
  }
}
</script>
