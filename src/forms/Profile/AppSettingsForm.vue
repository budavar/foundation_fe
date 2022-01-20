<template>
  <form @submit.prevent="updateSettings">

    <h5>Appilcation Settings</h5>

    <div class="mt-4">
      <div class="d-grid gap-2">
        <button class="btn btn-secondary" type="submit" disabled>Save</button>
      </div>
    </div>
  </form>
</template>

<script>

export default {
  name: "AppSettingsForm",

  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null
    }
  }
}
</script>
