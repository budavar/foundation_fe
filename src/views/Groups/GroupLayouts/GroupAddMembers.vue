<template>
  <div>
    <div class="bg-indigo-light p-2">
      <div class="d-flex align-items-center ">
        <div class="w-25">
          <img v-if="getGroup.photo === null" src="https://via.placeholder.com/480x270.png" class="w-100">
          <img v-else :src="photoLocation + getGroup.photo" class="w-100">
        </div>
        <h4 class="ms-3"><strong>{{getGroup.name}}</strong></h4>
      </div>
    </div>
    <h5 class="mt-3 text-center hd-style">Add New Members
      <router-link to="/groups/' + getGroup.id + '/members">
        <font-awesome-icon icon="users" class="ms-2 isClickable hd-style" />
      </router-link>
    </h5>
    <div>
      <form @submit.prevent>
        <InputRadio
          name="scope"
          v-model="scope"
          layout-class="bg-soft-light"
          radio-layout="horizontal"
          :radio-options="[
              { 'value' : 'friends', 'label' : 'Show friends'},
              { 'value' : 'users', 'label' : 'Search all users'}
            ]"
          :externalErrors="externalErrors"
          :validation-rules="[]"
          :server-request-in-progress="serverRequestInProgress">
        </InputRadio>
        <InputSearch v-show="scope === 'users'"
          name="searchForName"
          placeholder="search for friends"
          v-model="searchString"
          layout-class="p-2"
          :externalErrors="externalErrors"
          :validation-rules="[]"
          :server-request-in-progress="serverRequestInProgress"
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
            :person="user"
            :badges="user.friend === true ? [{ color: 'info', text: 'Friend' }]: []">
            <template v-slot:options>
              <button v-if="!user.addFriend" class="btn btn-sm btn-primary" @click="createMemberInvite(user.id)">Invite to Join</button>
              <span v-else color="text-success">... member invite sent</span>
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

import { mapActions, mapGetters } from 'vuex'
import { fileLocations } from "@/config/BaseConfig"
import PeopleService from "@/services/PeopleService"
import InputSearch from '@/components/InputElements/InputSearch'
import InputRadio from '@/components/InputElements/InputRadio'
import PersonLine from '@/components/PersonLine'
import FlashMessage from '@/components/FlashMessage'
import DataLoading from '@/components/LoadingGifs/DataLoading'

export default {
  name: "GroupMembers",

  components: {
    PersonLine,
    FlashMessage,
    DataLoading,
    InputSearch,
    InputRadio
  },

  data () {
    return {
      photoLocation: fileLocations.groups,
      serverRequestInProgress: false,
      externalErrors: null,
      loading: false,
      searchString: "",
      scope: "friends",
      list: [],
      friendList: [],
      userList: [],
      screenMsg: null,
      screenMsgType: null
    }
  },

  computed: {
    ...mapGetters('group', ['getGroup'])
  },

  watch: {
    scope (newVal, oldVal) {
      if (newVal === 'friends') {
        this.list = this.friendList
      } else {
        this.list = []
      }
    }
  },

  created () {
    this.serverRequestInProgress = true
    this.loading = true
    this.screenMsg = null
    const payload = {
      filter_directive: 'exclude',
      entity: 'group',
      entity_id: this.getGroup.id
    }
    PeopleService.getMyFriends(payload)
      .then(response => {
        this.friendList = response.data.list.map(obj => ({ ...obj, inviteMember: false, friend: true, actionMsg: null, actionMsgType: null }))
        this.list = this.friendList
        if (this.list.length === 0) {
          this.screenMsg = "No people found for search criteria"
          this.screenMsgType = "info"
        }
      })
      .finally(() => {
        this.serverRequestInProgress = false
        this.loading = false
      })
  },

  methods: {
    ...mapActions("group", ["createGroupMember"]),

    createMemberInvite (userId) {
      const payload = {
        user_id: userId
      }
      this.createGroupMember(payload)
        .then(response => {
          const index = this.list.findIndex(item => item.id === userId)
          this.list[index].inviteMember = true
        })
        .catch(() => {
          const index = this.list.findIndex(item => item.id === userId)
          this.list[index].actionMsg = 'Unexpected error in creating member invite request'
          this.list[index].actionMsgType = 'danger'
        })
    },

    startSearch () {
      this.serverRequestInProgress = true
      this.loading = true
      this.screenMsg = null
      const payload = {
        search_string: this.searchString,
        filter_directive: 'exclude',
        entity: 'group',
        entity_id: this.getGroup.id
      }
      PeopleService.searchUsers(payload)
        .then(response => {
          this.userList = response.data.list.map(obj => ({ ...obj, inviteMember: false, friend: response.data.friend_ids.includes(obj.id), actionMsg: null, actionMsgType: null }))
          this.list = this.userList
          console.log(this.userList)
          if (this.list.length === 0) {
            this.screenMsg = "No people found for search criteria"
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

<style>
.bg-hover:hover {
  background: var(--bs-light);
}
</style>
