<template>
  <div>
    <GroupHeadingLarge />
    <h6 class="attr-label-style mt-3 mb-0">Purpose of the Group</h6>
    <p>{{getGroup.description}}</p>
    <h6 class="attr-label-style mb-0">Group Visibility</h6>
    <p>{{textualDefinitions.visibility[getGroup.visibility]}}</p>
    <h6 class="attr-label-style mb-0">Joining the Group</h6>
    <p>{{textualDefinitions.request_to_join_rule[getGroup.request_to_join_rule]}}</p>
    <h6 class="attr-label-style mb-0">Event Creation</h6>
    <p>{{textualDefinitions.allow_to_add_events[getGroup.allow_to_add_events]}}</p>
    <h6 class="attr-label-style mb-0">Group Rules</h6>
    <p v-if="getGroup.rules.length === 0" class="text-secondary"><i> No membership rules have been set up for this group</i></p>
    <ol>
      <li v-for="(rule, idx) in getGroup.rules" :key="'rule-' + idx" >{{rule}}</li>
    </ol>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { fileLocations } from "@/config/BaseConfig"
import { codeDefinitions } from "@/config/TextDefinitions"
import GroupHeadingLarge from './GroupHeadingLarge'

export default {
  name: "GroupDetails",

  components: {
    GroupHeadingLarge
  },

  data () {
    return {
      photoLocation: fileLocations.groups,
      textualDefinitions: codeDefinitions
    }
  },

  computed: {
    ...mapGetters('group', ['getGroup'])
  }
}
</script>
