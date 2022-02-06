<template>
  <div class="card mb-3 isClickable" @click="showGroup">
    <img v-if="group.photo === null" src="https://via.placeholder.com/480x270.png" class="w-100">
    <img v-else :src="photoLocation + group.photo" class="w-100">
    <div v-if="noticeAlert !== null" class="card-img-overlay">
      <div :class="'alert p-1 text-center text-dark white-border ' + noticeAlertType">
        {{noticeAlert}}
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{group.name}}</h5>
      <p class="card-text">{{group.description.length > 200 ? group.description.substring(0,195) + ' ....': group.description}}</p>
    </div>
  </div>
</template>

<script>

import { fileLocations } from "@/config/BaseConfig"

export default {
  name: 'GroupCard',

  props: {
    group: { type: Object, required: true }
  },

  computed: {
    noticeAlert () {
      if (this.group.status === 'closed') {
        return "Group is flagged as closed"
      } else {
        if (this.group.my_member !== null && this.group.my_member.status === 'invited') {
          return "You have been invited to join this group"
        }
        if (this.group.my_member !== null && this.group.my_member.status === 'requested') {
          return "Your request to join is still pending approval"
        }
      }
      return null
    },
    noticeAlertType () {
      if (this.group.status === 'closed') {
        return 'alert-danger'
      } else {
        if (this.group.my_member !== null && this.group.my_member.status === 'invited') {
          return 'alert-success'
        }
        if (this.group.my_member !== null && this.group.my_member.status === 'requested') {
          return 'alert-info'
        }
      }
      return null
    }
  },

  data () {
    return {
      photoLocation: fileLocations.groups
    }
  },

  methods: {
    showGroup () {
      if (this.group.my_member !== null && this.group.my_member.status === 'active') {
        this.$router.push('/groups/' + this.group.id)
      } else {
        if (this.group.status === 'active') {
          const payload =
          {
            modal: 'groupSummaryModal',
            focus: 'group',
            data: this.group
          }
          this.eventBus.emit('open-modal', payload)
        }
      }
    }
  }
}
</script>

<style scoped>
  .white-border {
    border-style: solid;
    border-color: white;
    border-width: medium;
    border-radius: 10px;
  }
</style>
