<template>
  <div>
    <h5 class="hd-style">Member Settings</h5>
    <MemberSettingsForm class="ms-5" />
  </div>
</template>

<script>

import MemberSettingsForm from '@/forms/Group/MemberSettingsForm'

export default {
  name: "MemberSettings",

  components: {
    MemberSettingsForm
  }

}
</script>
