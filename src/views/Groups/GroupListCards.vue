<template>
  <div v-for="group in groups" :key="group.id" class="col-sm-12 col-md-4 col-lg-3 col-xl-2">
    <GroupCard :group="group" />
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import GroupCard from './GroupCard'

export default {
  name: 'GroupListCards',

  components: {
    GroupCard
  },

  computed: {
    ...mapGetters("group", ["groups"])
  }
}
</script>
