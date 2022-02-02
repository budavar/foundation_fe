<template>
  <GroupEditModal
    @register-modal="registerModal"
    @close-modal="closeModal">
  </GroupEditModal>
  <MemberAdminModal
    :member="data.member"
    @register-modal="registerModal"
    @close-modal="closeModal">
  </MemberAdminModal>
  <GroupSummaryModal
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
        group: {},
        member: {
          user: {
            name: "A",
            avatar: null
          }
        }
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
        this.data[payload.focus] = payload.data
        this.modals[payload.modal].show()
      }
    },

    registerModal (modalID) {
      this.modals[modalID] = new Modal(document.getElementById(modalID))
    }
  }
}
</script>
