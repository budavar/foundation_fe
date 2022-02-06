<template>
  <PersonLine
    :person="member.user"
    :badges="categoryBadge">
  </PersonLine>
</template>

<script>

import { codeDefinitions } from "@/config/TextDefinitions"
import PersonLine from '@/components/PersonLine'

export default {
  name: "GroupMemberLine",

  components: {
    PersonLine
  },

  props: {
    member: { type: Object, required: true }
  },

  computed: {
    categoryBadge () {
      switch (this.member.status) {
        case 'invited':
          return [
            {
              color: 'success',
              text: 'Invited to Join'
            }
          ]
        case 'blocked':
          return [
            {
              color: 'danger',
              text: 'Blocked'
            }
          ]
        case 'requested':
          return [
            {
              color: 'warning',
              text: 'Requested to Join'
            }
          ]
      }

      switch (this.member.role) {
        case 'owner':
          return [
            {
              color: 'primary',
              text: 'Owner'
            }
          ]
        case 'admin':
          return [
            {
              color: 'info',
              text: 'Admin'
            }
          ]
        case 'member':
          return []
        default:
          return [
            {
              color: 'dark',
              text: this.member.role
            }
          ]
      }
    }
  },

  data () {
    return {
      textualDefinitions: codeDefinitions
    }
  }
}
</script>
