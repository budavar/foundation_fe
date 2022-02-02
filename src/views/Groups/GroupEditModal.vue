<template>
<div class="modal fade" id="groupEditModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="groupEditModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="groupEditModalLabel">Edit Group Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <GroupEditForm
          @group-updated="this.$emit('close-modal', modalName)" />
      </div>
    </div>
  </div>
</div>
</template>
<script>

import GroupEditForm from '@/forms/Group/GroupEditForm'

export default {
  name: 'GroupEditModal',

  components: {
    GroupEditForm
  },

  data () {
    return {
      modalName: 'groupEditModal'
    }
  },

  mounted () {
    this.$emit('register-modal', this.modalName)
  }
}
</script>
