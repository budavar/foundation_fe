<template>
  <div>
    <div class="bg-indigo-light p-2">
      <div class="d-flex align-items-center ">
        <div class="w-25">
          <img v-if="getGroup.photo === null" src="https://via.placeholder.com/480x270.png" class="w-100">
          <img v-else :src="photoLocation + getGroup.photo" class="w-100">
        </div>
        <h4 class="ms-3"><strong>{{getGroup.name}}</strong></h4>
      </div>
    </div>
    <h5 class="mt-3 text-center hd-style">Members</h5>
    <ul class="no-bullets">
      <li v-for="member in getGroup.members" :key="member.id">
        <PersonLine
          :class="allowManagement ? 'isClickable bg-hover' : ''"
          :person="member.user"
          :badges="categoryBadge(member)"
          @click="showOptions(member)">
        </PersonLine>
      </li>
    </ul>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { fileLocations } from "@/config/BaseConfig"
import { codeDefinitions } from "@/config/TextDefinitions"
import PersonLine from '@/components/PersonLine'

export default {
  name: "GroupMembers",

  components: {
    PersonLine
  },

  data () {
    return {
      photoLocation: fileLocations.groups,
      textualDefinitions: codeDefinitions
    }
  },

  computed: {
    ...mapGetters('group', ['getGroup']),

    allowManagement () {
      if (['owner', 'admin'].includes(this.getGroup._my_authority)) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {

    categoryBadge (member) {
      switch (member.status) {
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

      switch (member.role) {
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
              text: member.role
            }
          ]
      }
    },

    showOptions (member) {
      if (!this.allowManagement) {
        return
      }
      const payload =
      {
        modal: 'memberAdminModal',
        focus: 'member',
        data: member
      }
      this.eventBus.emit('open-modal', payload)
    }
  }
}
</script>

<style>
.bg-hover:hover {
  background: var(--bs-light);
}
</style>
