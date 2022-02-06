<template>
  <GroupModals />
  <div class="row">
    <div v-for="group in groups" :key="group.id" class="col-sm-12 col-md-4 col-lg-3">
      <GroupCard :group="group" />
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import GroupCard from './GroupCard'
import GroupModals from './GroupModals'

export default {
  name: 'GroupListCards',

  components: {
    GroupCard,
    GroupModals
  },

  computed: {
    ...mapGetters("group", ["groups"])
  }
}
</script>
