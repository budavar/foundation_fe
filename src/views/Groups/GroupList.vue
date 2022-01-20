<template>
  <div v-if="loading === true" class="col-md-8 col-lg-6 col-xl-5 mt-5">
    <DataLoading />
  </div>
  <div v-if="loading === false">
    <div class="text-center mb-4">
      <h4>My Groups</h4>
      <div>
        <span>
          <router-link to="/groups/search">Search for groups</router-link>
        </span>
        <span class="ms-4"><a href="#" @click="getGroups()">Refresh</a></span>
      </div>
    </div>
    <GroupListCards />
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import DataLoading from '@/components/LoadingGifs/DataLoading'
import GroupListCards from './GroupListCards'

export default {
  name: 'GroupList',

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
    this.getGroups()
  },

  methods: {
    ...mapActions("group", ["getGroups"])
  }
}
</script>
