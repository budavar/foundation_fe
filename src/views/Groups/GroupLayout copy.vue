<template>
  <GroupModals />
  <div v-if="loading === true" class="col-md-8 col-lg-6 col-xl-5 mt-5">
    <DataLoading />
  </div>
  <div v-if="loading === false && getGroup !== {}" class="col-md-8 col-lg-6 col-xl-5 mt-5 p-2 bg-white">
    <EntityNavBar />
    <div class="text-center">
      <a href="#" @click="eventBus.emit('open-modal', 'groupEditModal')">edit</a>
    </div>
    <img v-if="getGroup.photo === null" src="https://via.placeholder.com/480x270.png" class="w-100">
    <img v-else :src="photoLocation + getGroup.photo" class="w-100">
    <div class="text-center mt-2">
      <h5><strong>{{getGroup.name}}</strong></h5>
      </div>
      <p class="mt-3">{{getGroup.description}}</p>
  </div>
  <hr/>
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

<style>
  .hd-color: var(--bs-indigo)
</style>
