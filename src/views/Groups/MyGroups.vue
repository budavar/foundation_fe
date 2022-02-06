<template>
  <div class="col-12">
    <div class="text-center mb-4">
      <h4>My Groups</h4>
      <div>
        <span>
          <router-link to="/groups/search">Search for groups</router-link>
        </span>
        <span class="ms-4"><a href="#" @click="myGroups()">Refresh</a></span>
      </div>
    </div>
    <div v-if="loading === true" class="col-md-8 col-lg-6 col-xl-5 mt-5">
      <DataLoading />
    </div>
    <div v-else class="col-12">
      <GroupListCards />
    </div>
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import DataLoading from '@/components/LoadingGifs/DataLoading'
import GroupListCards from './GroupListCards'

export default {
  name: 'MyGroups',

  components: {
    GroupListCards,
    DataLoading
  },

  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null
    }
  },

  computed: {
    ...mapGetters("group", ["groups", "loading", "error"]),
    ...mapGetters("auth", ["authUser"])
  },

  created () {
    this.myGroups()
  },

  methods: {
    ...mapActions("group", ["getMyGroups"]),

    myGroups () {
      this.getMyGroups()
        .then(response => {
          this.serverRequestInProgress = false
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
