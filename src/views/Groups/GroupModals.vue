<template>
  <GroupEditModal
    @register-modal="registerModal"
    @close-modal="closeModal">
  </GroupEditModal>
  <MemberAdminModal v-if="data.member != null"
    :member="data.member"
    @register-modal="registerModal"
    @close-modal="closeModal">
  </MemberAdminModal>
  <GroupSummaryModal v-if="data.group != null"
    :group="data.group"
    @register-modal="registerModal"
    @close-modal="closeModal">
  </GroupSummaryModal>
</template>

<script>

import GroupEditModal from './GroupEditModal'
import MemberAdminModal from './MemberAdminModal'
import GroupSummaryModal from './GroupSummaryModal'
import { Modal } from 'bootstrap'

export default {
  name: 'GroupModals',

  components: {
    GroupEditModal,
    MemberAdminModal,
    GroupSummaryModal
  },

  data () {
    return {
      focus: null,
      data: {
        group: null,
        member: null
      },
      modals: {
        groupEditModal: null,
        memberAdminModal: null,
        groupSummaryModal: null
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

    openModal (payload) {
      if (typeof payload === 'string') {
        this.modals[payload].show()
      } else {
        if (this.modals[payload.modal] === null) {
          this.data[payload.focus] = payload.data
        } else {
          this.data[payload.focus] = payload.data
          this.modals[payload.modal].show()
        }
      }
    },

    registerModal (modalID) {
      this.modals[modalID] = new Modal(document.getElementById(modalID))
      if (['groupSummaryModal', 'memberAdminModal'].includes(modalID)) {
        this.modals[modalID].show()
      }
    }
  }
}
</script>
