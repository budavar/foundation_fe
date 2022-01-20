<template>

  <nav class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm fixed-top">
    <div class="container">

      <a class="navbar-brand" href="#">BUDAVAR-Tech</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav me-auto">
        </ul>

        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/auth/register" class="nav-link" >Register
            <font-awesome-icon icon="user-plus" /></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/auth/login" class="nav-link" >Login
            <font-awesome-icon icon="sign-in-alt" /></router-link>
          </li>
        </ul>

      </div>
    </div>
  </nav>

</template>

<script>

export default {
  name: "TopNavBarAuth"
}
</script>
