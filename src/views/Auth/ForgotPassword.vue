<template>
  <div class="col-md-8 col-lg-6 col-xl-5 mt-5">
    <div class="text-center mb-4">
      <h4>Forgot your Password?</h4>
      <p class="text-muted mb-4">Enter your email to receive a reset password link</p>
    </div>
    <div class="card">
      <div class="card-body p-4">
        <div class="p-3">
          <ForgotPasswordForm class="p-3 bg-white" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import ForgotPasswordForm from "@/forms/ForgotPasswordForm"

export default {
  name: 'ForgotPassword',
  components: {
    ForgotPasswordForm
  }
}
</script>
