<template>
  <FriendModals :friend="selectedFriend" />
  <div v-if="loading === true" class="col-md-8 col-lg-6 col-xl-5 mt-5">
    <DataLoading />
  </div>
  <div v-if="loading === false" class="col-md-8 col-lg-6 col-xl-5 mt-5">
    <div class="text-center mb-4">
      <h4>Friends</h4>
      <div>
        <span>
          <router-link to="/friends/search">Search for friends</router-link>
        </span>
        <span class="ms-4"><a href="#" @click="getFriends()">Refresh</a></span>
      </div>
    </div>
    <ul class="no-bullets">
      <li v-for="friend in friends" :key="friend.friend_resource_id">
        <PersonLine
          class="isClickable"
          :person="friend"
          :badges="categoryBadge(friend)"
          @click="showOptions(friend)">
        </PersonLine>
      </li>
    </ul>
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import PersonLine from '@/components/PersonLine'
import DataLoading from '@/components/LoadingGifs/DataLoading'
import FriendModals from './FriendModals'

export default {
  name: 'FriendManager',

  components: {
    PersonLine,
    FriendModals,
    DataLoading
  },

  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null,
      selectedFriend: {
        avatar: null,
        name: "",
        status: null
      }
    }
  },

  computed: {
    ...mapGetters("friend", ["friends", "loading", "error"]),
    ...mapGetters("auth", ["authUser"])
  },

  created () {
    this.getFriends()
  },

  methods: {

    ...mapActions("friend", ["getFriends"]),

    categoryBadge (friend) {
      switch (friend.status) {
        case 'active':
          return null
        case 'blocked':
          return [
            {
              color: 'danger',
              text: 'Blocked'
            }
          ]
        case 'requested':
          if (friend.requester_id === this.authUser.id) {
            return [
              {
                color: 'info',
                text: 'Rqs. Sent'
              }
            ]
          } else {
            return [
              {
                color: 'success',
                text: 'Rqs. Received'
              }
            ]
          }
      }
    },

    showOptions (friend) {
      this.selectedFriend = friend
      this.eventBus.emit('open-modal', 'friendActionModal')
    },

    processActionOnList (action, id) {
      var index = null
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].friend_resource_id === id) {
          index = i
        }
      }

      switch (action) {
        case 'accept':
          this.list[index].status = 'accepted'
          break
        case 'block':
          this.list[index].status = 'blocked'
          break
        case 'delete':
          this.list.splice(index, 1)
          break
        case 'unblock':
          this.list[index].status = 'accepted'
          break
      }
    }
  }
}
</script>
