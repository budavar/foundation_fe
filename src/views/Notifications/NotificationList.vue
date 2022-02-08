<template>
  <div class="d-flex bg-indigo text-white p-2 m-0">
    <h5>
      Notifications
    </h5>
    <div class="flex-grow-1">
    </div>
    <div class="dropdown">
      <div
        class="nav-link nav-icons text-end"
        type="button"
        id="notificationsDropDown"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        <font-awesome-icon icon="ellipsis-v" />
      </div>
      <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="notificationsDropDown">
        <li><a class="dropdown-item" href="#">Mark all read</a></li>
        <li><a class="dropdown-item" href="#">Open Notifications</a></li>
        <li><a class="dropdown-item" href="#">Refresh</a></li>
      </ul>
    </div>
  </div>
  <div :class="background">
    <div class="p-2 text-center">
      <button type="button" class="btn btn-sm rounded-pill ms-2" :class="viewNotifications === 'all' ? 'btn-primary' : 'btn-outline-primary'">All</button>
      <button type="button" class="btn btn-sm rounded-pill ms-2" :class="viewNotifications === 'unread' ? 'btn-primary' : 'btn-outline-primary'">Unread</button>
    </div>
    <div v-if="loading === true" class="text-center">
      <DataLoading />
    </div>
    <div v-if="loading === false" class="p-1">
      <div
        v-for="notification in notifications" :key="notification.id">
        <NotificationCard
          :notification="notification"
          :display-scope="displayScope"/>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import DataLoading from '@/components/LoadingGifs/DataLoading'
import NotificationCard from './NotificationCard'

export default {
  name: "NotificationList",

  components: {
    NotificationCard,
    DataLoading
  },

  props: {
    displayScope: { type: String, required: true },
    loadStore: { type: Boolean, required: true },
    background: { type: String }
  },

  data () {
    return {
      viewNotifications: 'all'
    }
  },

  computed: {
    ...mapGetters('notification', ['notifications', 'loading', 'error'])
  },

  created () {
    if (this.loadStore) {
      this.loadNotifications()
    }
  },

  methods: {
    ...mapActions('notification', ['loadNotifications'])
  }

}
</script>
