<template>
  <span class="dropdown-menu dropdown-menu-end float-end shadow" aria-labelledby="dropdownMenuClickableInside" style="height: 90%;">
    <NotificationList
      display-scope="summary"
      background="bg-indigo-light"
      :load-store="loadStore" />
  </span>
</template>

<script>

import NotificationList from './NotificationList'

export default {
  name: "NotificationDropDown",

  components: {
    NotificationList
  },

  props: {
    loadStore: { type: Boolean, required: true }
  }
}
</script>
