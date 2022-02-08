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
          <li class="me-3 nav-item">
            <div class="dropdown">
              <span
                class="nav-link nav-icons pt-1 pb-1"
                type="button"
                id="dropdownMenuClickableInside"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false">
                <font-awesome-icon icon="bell" />
                <sup class="bg-danger rounded-pill"><span class="badge">27</span></sup>
              </span>
              <NotificationDropDown :load-store="true" />
            </div>
          </li>
          <li class="me-3 nav-item">
            <router-link to="/profiles/my-profile" class="nav-link nav-icons  pt-1 pb-1" >
            <font-awesome-icon icon="user" /></router-link>
          </li>
          <li class="nav-item">
            <span class="nav-link nav-icons pt-1 pb-1">
            <font-awesome-icon icon="sign-out-alt" @click="logout"/>
            </span>
          </li>
        </ul>

      </div>
    </div>
  </nav>

</template>

<script>

import NotificationDropDown from "@/views/Notifications/NotificationDropDown"

export default {
  name: "TopNavBarWeb",

  components: {
    NotificationDropDown
  },

  methods: {
    logout () {
      this.$store.dispatch("auth/logout")
    }
  }
}
</script>

<style scoped>
@media (min-width: 768px) {
    .dropdown-menu {
        width: 500px !important;  /* change the number to whatever that you need */
        padding: 0px !important;
        margin-top: 20px !important;
    }
}

.nav-icons {
  font-size: 1.5rem;
}
</style>
