<template>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Public Sans, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #495057;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #495057;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
