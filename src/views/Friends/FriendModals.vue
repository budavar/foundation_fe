<template>
  <FriendActionModal
    :friend="friend"
    @register-modal="registerModal"
    @close-modal="closeModal">
  </FriendActionModal>
</template>

<script>

import FriendActionModal from './FriendActionModal'
import { Modal } from 'bootstrap'

export default {
  name: 'FriendModals',

  components: {
    FriendActionModal
  },

  props: {
    friend: { type: Object, required: true }
  },

  data () {
    return {
      modals: {
        friendActionModal: null
      }
    }
  },

  mounted () {
    this.eventBus.on('open-modal', this.openModal)
  },

  beforeUnmount () {
    this.eventBus.off('open-modal', this.openModal)
  },

  methods: {

    closeModal (modalID) {
      this.modals[modalID].hide()
    },

    openModal (modalID) {
      this.modals[modalID].show()
    },

    registerModal (modalID) {
      this.modals[modalID] = new Modal(document.getElementById(modalID))
    }
  }
}
</script>
