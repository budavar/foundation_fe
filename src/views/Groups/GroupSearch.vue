<template>
  <div class="col-12">
    <div class="text-center mb-4">
      <h4>Search Groups Groups</h4>
      <div>
        <span>
          <router-link to="/groups">My Groups</router-link>
        </span>
        <span class="ms-4"><a href="#" @click="searchGroups()">Refresh</a></span>
      </div>
    </div>

    <div class="text-center">
      <form @submit.prevent>
        <InputRadio
          name="scope"
          v-model="scope"
          layout-class="bg-soft-light"
          radio-layout="horizontal"
          :radio-options="[
              { 'value' : 'friend-groups', 'label' : 'Owned by Friends'},
              { 'value' : 'all-groups', 'label' : 'All Avaialble Groups'}
            ]"
          :externalErrors="externalErrors"
          :validation-rules="[]"
          :server-request-in-progress="serverRequestInProgress">
        </InputRadio>
        <InputSearch
          name="searchForName"
          placeholder="search for groups"
          v-model="searchString"
          layout-class="p-2"
          :allow-empty-search="true"
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
      <GroupListCards />
      <FlashMessage key="screen-msg" :message="screenMsg" :msg-type="screenMsgType" @clear-message="screenMsg = null" />
    </div>
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import DataLoading from '@/components/LoadingGifs/DataLoading'
import GroupListCards from './GroupListCards'
import InputSearch from '@/components/InputElements/InputSearch'
import InputRadio from '@/components/InputElements/InputRadio'
import FlashMessage from '@/components/FlashMessage'

export default {
  name: 'GroupList',

  components: {
    GroupListCards,
    DataLoading,
    InputSearch,
    InputRadio,
    FlashMessage
  },

  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null,
      searchString: "",
      scope: "all-groups",
      list: [],
      screenMsg: null,
      screenMsgType: null
    }
  },

  computed: {
    ...mapGetters("group", ["groups", "loading", "error"])
  },

  created () {
    this.groupSearchInit()
    this.screenMsg = "Search for groups using the search button.  Filter to all groups of groups owned by friends using the radio buttons."
    this.screenMsgType = 'info'
  },

  methods: {

    ...mapActions('group', ['searchForGroups', 'groupSearchInit']),

    startSearch () {
      const payload = {
        scope: this.scope,
        search_string: this.searchString
      }
      this.searchForGroups(payload)
        .then(response => {
          this.serverRequestInProgress = false
          if (this.groups.length === 0) {
            this.screenMsg = "No groups found that match search criteria used"
            this.screenMsgType = 'danger'
          } else {
            this.screenMsg = null
          }
        })
        .catch(error => {
          console.log(error.response)
          this.message = 'Unexpected error loading your groups'
          this.msgType = 'danger'
          this.serverRequestInProgress = false
        })
    }
  }
}
</script>
