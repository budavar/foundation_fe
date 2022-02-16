<template>
  <div class="d-flex bg-indigo text-white p-2 m-0">
    <div class="flex-grow-1 mt-1">
      <h4>
        Notifications
      </h4>
    </div>
    <div class="dropdown">
      <div
        class="nav-link nav-icons"
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
    <div v-if="loading === false" class="p-1 dropdown-menu-x">
      <div
        v-for="notification in notifications" :key="notification.id">
        <NotificationCard
          :notification="notification"
          :display-scope="displayScope"/>
      </div>
    </div>
    <MoreToLoadGif class="pt-2 pb-2"
      :moreToShow="loadingControls.more"
      :showGif="loadingControls.nextFetchLoading"
      @load-more="loadMore()"/>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import DataLoading from '@/components/LoadingGifs/DataLoading'
import MoreToLoadGif from '@/components/LoadingGifs/MoreToLoadGif'
import NotificationCard from './NotificationCard'

export default {
  name: "NotificationList",

  components: {
    NotificationCard,
    DataLoading,
    MoreToLoadGif
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
    ...mapGetters('notification', ['notifications', 'loadingControls', 'loading', 'error'])
  },

  created () {
    if (this.loadStore) {
      const payload = {
        pagination: 'init',
        current_fetch: 0
      }
      this.loadNotifications(payload)
    }
  },

  methods: {
    ...mapActions('notification', ['loadNotifications']),
    loadMore () {
      const payload = {
        pagination: 'more',
        current_fetch: this.loadingControls.fetchRequests
      }
      this.loadNotifications(payload)
    }
  }
}
</script>

<style scoped>
.dropdown-menu-x {
  max-height:65vh;
  overflow-y: auto;
}
</style>
