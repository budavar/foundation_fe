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
    <h5 class="mt-3 text-center hd-style">Members
      <router-link
        v-if="['owner', 'admin'].includes(getGroup._my_authority)"
        :to="'/groups/' + this.getGroup.id + '/add-members'">
        <font-awesome-icon icon="plus-circle" class="ms-2 isClickable hd-style" />
      </router-link>
    </h5>
    <ul class="no-bullets">
      <li v-for="member in getGroup.members" :key="member.id + member.status + member.role">
        <GroupMemberLIne
          :class="allowManagement ? 'isClickable bg-hover' : ''"
          :member="member"
          @click="showOptions(member)">
        </GroupMemberLIne>
      </li>
    </ul>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { fileLocations } from "@/config/BaseConfig"
import { codeDefinitions } from "@/config/TextDefinitions"
import GroupMemberLIne from './GroupMemberLIne'

export default {
  name: "GroupMembers",

  components: {
    GroupMemberLIne
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
