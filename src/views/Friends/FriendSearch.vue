<template>
  <div class="col-md-8 col-lg-6 col-xl-5 mt-5">
    <div class="text-center mb-4">
      <h4>Find Friends</h4>
      <div>
        <span>
          <router-link to="/friends">My Friends</router-link>
        </span>
      </div>
    </div>
    <div>
      <form @submit.prevent>
        <InputSearch
          name="searchForName"
          placeholder="search for friends"
          v-model="searchString"
          layout-class="p-2"
          serverErrors="serverErrors"
          @start-search="startSearch">
        </InputSearch>
      </form>
    </div>
    <div v-if="loading === true" class="text-center">
      <DataLoading />
    </div>
    <div v-if="loading === false">
      <ul class="no-bullets">
        <li v-for="user in list" :key="user.id">
          <PersonLine
            :person="user">
            <template v-slot:options>
              <button v-if="!user.addFriend" class="btn btn-sm btn-primary" @click="createFriendRequest(user.id)">Add Friend</button>
              <span v-else color="text-success">... friend request sent</span>
            </template>
            <template v-slot:action-error>
              <FlashMessage key="line-msg" :message="user.actionMsg" :msg-type="user.actionMsgType" @clear-message="user.actionMsg = null" />
            </template>
          </PersonLine>
        </li>
      </ul>
      <FlashMessage key="screen-msg" :message="screenMsg" :msg-type="screenMsgType" @clear-message="screenMsg = null" />
    </div>
  </div>
</template>
<script>

import { mapActions } from 'vuex'
import FriendService from "@/services/FriendService"
import InputSearch from '@/components/InputElements/InputSearch'
import PersonLine from '@/components/PersonLine'
import FlashMessage from '@/components/FlashMessage'
import DataLoading from '@/components/LoadingGifs/DataLoading'

export default {
  name: 'FriendManager',

  components: {
    InputSearch,
    PersonLine,
    FlashMessage,
    DataLoading
  },

  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null,
      loading: false,
      searchString: "",
      list: [],
      screenMsg: null,
      screenMsgType: null
    }
  },

  methods: {
    ...mapActions("friend", ["addFriend"]),

    createFriendRequest (userId) {
      this.addFriend(userId)
        .then(response => {
          const index = this.list.findIndex(item => item.id === userId)
          this.list[index].addFriend = true
        })
        .catch(() => {
          const index = this.list.findIndex(item => item.id === userId)
          this.list[index].actionMsg = 'Unexpected error in creating friend request'
          this.list[index].actionMsgType = 'danger'
        })
    },

    startSearch () {
      this.serverRequestInProgress = true
      this.loading = true
      this.screenMsg = null
      FriendService.search(this.searchString)
        .then(response => {
          this.list = response.data.result
          this.list.map(obj => ({ ...obj, addFriend: 'false', actionMsg: null, actionMsgType: null }))
          if (this.list.length === 0) {
            this.screenMsg = "No users found for search criteria"
            this.screenMsgType = "info"
          }
        })
        .finally(() => {
          this.serverRequestInProgress = false
          this.loading = false
        })
    }
  }
}
</script>
