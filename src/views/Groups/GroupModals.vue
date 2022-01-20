<template>
  <GroupActionModal
    :group="group"
    @register-modal="registerModal"
    @close-modal="closeModal">
  </GroupActionModal>
</template>

<script>

import GroupActionModal from './GroupActionModal'
import { Modal } from 'bootstrap'

export default {
  name: 'GroupModals',

  components: {
    GroupActionModal
  },

  props: {
    group: { type: Object, required: true }
  },

  data () {
    return {
      modals: {
        groupActionModal: null
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
