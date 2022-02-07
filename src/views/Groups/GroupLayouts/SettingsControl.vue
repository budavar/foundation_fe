<template>
  <div>
    <GroupHeadingLarge />
    <GroupSettings v-if="getGroup._my_authority == 'owner'"/>
    <hr class=""/>
    <MemberSettings />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import GroupHeadingLarge from './GroupHeadingLarge'
import GroupSettings from './GroupSettings'
import MemberSettings from './MemberSettings'

export default {
  name: "SettingControl",

  components: {
    GroupHeadingLarge,
    GroupSettings,
    MemberSettings
  },

  computed: {
    ...mapGetters('group', ['getGroup'])
  }
}
</script>
