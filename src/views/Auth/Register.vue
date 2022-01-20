<template>
  <div class="col-md-8 col-lg-6 col-xl-5 mt-5">
    <div class="text-center mb-4">
      <h4>Sign Up </h4>
      <p class="text-muted mb-4">Get you ShakyTales account now</p>
    </div>
    <RegisterForm class="p-3 bg-white" />
  </div>
</template>

<script>
import RegisterForm from "@/forms/RegisterForm"

export default {
  name: "RegisterView",
  components: {
    RegisterForm
  }
}
</script>
