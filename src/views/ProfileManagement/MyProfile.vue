<template>
  <div class="col-md-8 col-lg-6 col-xl-5 mt-5">
    <div class="text-center mb-4">
      <h4>Manage Your Profile</h4>
    </div>
    <div class="card mb-3">
      <div class="card-body p-2">
        <div class="p-3">
          <ProfileDetailsForm class="bg-white" />
        </div>
      </div>
    </div>
    <div class="card mb-3">
      <div class="card-body p-2">
        <div class="p-3">
          <ProfileAvatarForm class="bg-white" />
        </div>
      </div>
    </div>
    <div class="card mb-3">
      <div class="card-body p-2">
        <div class="p-3">
          <ChangePasswordForm class="bg-white" />
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body p-2">
        <div class="p-3">
          <AppSettingsForm class="bg-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileDetailsForm from "@/forms/Profile/ProfileDetailsForm"
import ProfileAvatarForm from "@/forms/Profile/ProfileAvatarForm"
import ChangePasswordForm from "@/forms/Profile/ChangePasswordForm"
import AppSettingsForm from "@/forms/Profile/AppSettingsForm"

export default {
  name: "MyProfileManagement",
  components: {
    ProfileDetailsForm,
    ProfileAvatarForm,
    ChangePasswordForm,
    AppSettingsForm
  }
}
</script>

<style>
  .hd-color: var(--bs-indigo)
</style>
