<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <Avatar
          :username="notification.action_user.name"
          :src="notification.action_user.avatar == null ? null : avatarLocation + notification.action_user.avatar"
          :rounded="notification.action_user.avatar == null ? true : false">
        </Avatar>
        <div class="ms-3 flex-grow-1">
          <p class="card-text">
            <strong>{{notification.action_user.name}}</strong>
          </p>
        </div>
        <div class="dropdown">
          <div
            class="nav-link nav-icons text-end text-dark"
            type="button"
            id="n-card-dd"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            <span class="ms-3 me-3" :class="notification.status === 'unread' ? 'text-primary' : 'text-secondary'">
              <font-awesome-icon icon="dot-circle" />
            </span>
            <font-awesome-icon icon="ellipsis-v" />
          </div>
          <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="n-card-dd">
            <li><a class="dropdown-item" href="#">Mark as read</a></li>
            <li><a class="dropdown-item" href="#">Delete</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { fileLocations } from "@/config/BaseConfig"
import Avatar from '@/components/Avatar'

export default {
  name: "NotificationCard",

  components: {
    Avatar
  },

  props: {
    notification: { type: Object, required: true },
    displayScope: { type: String, required: true }
  },

  data () {
    return {
      avatarLocation: fileLocations.avatars
    }
  }

}
</script>
