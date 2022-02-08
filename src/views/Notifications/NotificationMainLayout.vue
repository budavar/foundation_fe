<template>
  <GroupModals />
  <div v-if="loading === true" class="col-md-8 col-lg-6 col-xl-5 mt-5">
    <DataLoading />
  </div>
  <div v-if="loading === false && getGroup !== {}" class="col-md-8 col-lg-6 col-xl-5 mt-5 p-2 bg-white">
    <EntityNavBar
      url-entity-type="groups"
      :entity-id="getGroup.id"
      :authorisation="getGroup._my_authority" />
    <router-view></router-view>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { fileLocations } from "@/config/BaseConfig"
import DataLoading from '@/components/LoadingGifs/DataLoading'
import EntityNavBar from '@/menus/EntityNavBar'
import GroupModals from './GroupModals'

export default {
  name: "GroupLayout",

  components: {
    DataLoading,
    EntityNavBar,
    GroupModals
  },

  props: {
    groupId: { type: String, required: true }
  },

  data () {
    return {
      photoLocation: fileLocations.groups
    }
  },

  computed: {
    ...mapGetters('group', ['getGroup', 'loading', 'error'])
  },

  created () {
    this.loadGroup(this.groupId)
  },

  methods: {
    ...mapActions('group', ['loadGroup'])
  }

}
</script>
