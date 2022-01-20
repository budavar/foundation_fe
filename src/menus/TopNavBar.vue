<template>

  <nav class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm fixed-top">
    <div class="container">

      <a class="navbar-brand" href="#">BUDAVAR-Tech</a>
      <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#sideBarNavID" aria-controls="sideBarNavID">
        <font-awesome-icon icon="bars" />
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav me-auto">
        </ul>

        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/admin/list" class="nav-link" >
            <font-awesome-icon icon="cog" /></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profiles/my-profile" class="nav-link" >
            <font-awesome-icon icon="user" /></router-link>
          </li>
          <li class="nav-item">
            <span class="nav-link">
            <font-awesome-icon icon="sign-out-alt" @click="logout"/>
            </span>
          </li>
        </ul>

      </div>
    </div>
  </nav>

</template>

<script>

export default {
  name: "TopNavBarWeb",

  methods: {
    logout () {
      this.$store.dispatch("auth/logout")
    }
  }
}
</script>
