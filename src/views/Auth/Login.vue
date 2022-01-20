<template>
  <div class="col-md-8 col-lg-6 col-xl-5 mt-5">
    <div class="text-center mb-4">
      <h4>Sign in</h4>
      <p class="text-muted mb-4">Sign in to continue to ShakyTales</p>
    </div>
    <div class="card">
      <div class="card-body p-4">
        <div class="p-3">
          <LoginForm class="p-3 bg-white" />
        </div>
      </div>
    </div>
    <div class="mt-5 text-center">
      <p> Don't have an account ?
        <router-link
          to="/auth/register"
          class="text-pink-500 transition hover:text-pink-600">
          Register for an account
        </router-link>
      </p>
    </div>
  </div>

</template>

<script>
import LoginForm from "@/forms/LoginForm"

export default {
  name: 'LoginView',
  components: {
    LoginForm
  }
}
</script>
