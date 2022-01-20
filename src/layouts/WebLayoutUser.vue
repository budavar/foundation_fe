<template>
  <div>
    <TopNavBar></TopNavBar>
    <SideNavBar @hide-sidebar="hideSidebar()"></SideNavBar>
    <div class="container-fluid user-layout">
      <div class="row justify-content-center">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>

import TopNavBar from "@/menus/TopNavBar"
import SideNavBar from "@/menus/SideNavBar"
import { Offcanvas } from 'bootstrap'

export default {
  name: "WebLayoutUser",
  components: {
    TopNavBar,
    SideNavBar
  },

  data () {
    return {
      sidebar: null
    }
  },

  mounted () {
    const myOffcanvas = document.getElementById('sideBarNavID')
    this.sidebar = new Offcanvas(myOffcanvas)
  },

  methods: {
    hideSidebar () {
      this.sidebar.hide()
    }
  }

}
</script>

<style>
  .user-layout {
    background: #f7f7ff;
    min-height: calc(100vh - 60px);
  }
</style>
