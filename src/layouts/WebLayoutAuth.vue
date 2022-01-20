<template>
  <div>
    <TopNavBarAuth></TopNavBarAuth>
    <div class="container-fluid auth-layout">
      <div class="row justify-content-center">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>

import TopNavBarAuth from "../menus/TopNavBarAuth"

export default {
  name: "WebLayoutAuth",
  components: {
    TopNavBarAuth
  }
}
</script>

<style scoped>
.auth-layout {
  background: #f7f7ff
}
</style>
