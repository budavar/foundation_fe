<template>
  <div class="mt-3 mb-3">
    <div class="text-center">
      <h5><strong>{{getGroup.name}}</strong></h5>
    </div>
    <img v-if="getGroup.photo === null" src="https://via.placeholder.com/480x270.png" class="w-100">
    <img v-else :src="photoLocation + getGroup.photo" class="w-100">
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { fileLocations } from "@/config/BaseConfig"

export default {
  name: "GroupSettings",

  data () {
    return {
      photoLocation: fileLocations.groups
    }
  },

  computed: {
    ...mapGetters('group', ['getGroup'])
  }
}
</script>
