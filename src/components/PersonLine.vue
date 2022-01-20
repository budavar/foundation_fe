<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <Avatar
          :username="person.name"
          :src="person.avatar == null ? null : avatarLocation + person.avatar"
          :rounded="person.avatar == null ? true : false">
        </Avatar>
        <div class="ms-3">
          <strong>{{person.name}}</strong>
          <!-- eslint-disable -->
          <span v-for="b in badges" :class="'ms-2 badge bg-' + b.color">{{b.text}}</span>
          <!-- eslint-enable -->
        </div>
        <div class="flex-grow-1 text-end">
          <slot name="options"></slot>
        </div>
      </div>
    </div>
    <slot name="action-error"></slot>
  </div>
</template>
<script>

import Avatar from '@/components/Avatar'
import { fileLocations } from "@/config/BaseConfig"

export default {
  name: 'PersonLine',

  components: {
    Avatar
  },

  props: {
    person: { required: true },
    badges: { default: [] }
  },

  data () {
    return {
      avatarLocation: fileLocations.avatars
    }
  }
}
</script>
