<template>
  <form @submit.prevent="create">

    <InputText
      name="name"
      placeholder="group name"
      v-model="name"
      labelText="Group Name"
      layout-class="bg-soft-light"
      :externalErrors="externalErrors"
      :server-request-in-progress="serverRequestInProgress"
      validation-rules="required">
    </InputText>

    <InputRadio
      name="visibility"
      v-model="visibility"
      labelText="Group Visibility"
      layout-class="bg-soft-light"
      radio-layout="horizontal"
      :radio-options="[
          { 'value' : 'private', 'label' : 'Private'},
          { 'value' : 'friends', 'label' : 'Friends'},
          { 'value' : 'public', 'label' : 'Public'}
        ]"
      :externalErrors="externalErrors"
      :validation-rules="[]"
      :server-request-in-progress="serverRequestInProgress">
    </InputRadio>

    <InputTextArea
      name="description"
      placeholder="description"
      v-model="description"
      labelText="Description"
      layout-class="bg-soft-light"
      :rows="4"
      :external-errors="externalErrors"
      :validation-rules="['min-len.0', 'max-len.1000']"
      :server-request-in-progress="serverRequestInProgress">
    </InputTextArea>

    <div class="mt-4">
      <div class="d-grid gap-2">
        <button class="btn btn-primary" type="submit" :disabled="serverRequestInProgress">Create</button>
      </div>
    </div>
    <FlashMessage :message="message" :msg-type="msgType" @clear-message="message = null" />
  </form>
</template>

<script>

import { mapActions } from 'vuex'
import InputText from "@/components/InputElements/InputText"
import InputTextArea from "@/components/InputElements/InputTextArea"
import InputRadio from "@/components/InputElements/InputRadio"
import FlashMessage from "@/components/FlashMessage"

export default {
  name: "NewGroupForm",
  components: {
    InputTextArea,
    InputRadio,
    InputText,
    FlashMessage
  },

  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null,
      name: "",
      description: "",
      visibility: "friends",
      message: null,
      msgType: null
    }
  },

  methods: {
    ...mapActions('group', ['createGroup']),

    create (realAction, userAction) {
      this.serverRequestInProgress = true
      this.externalErrors = null
      this.message = null
      this.msgType = null

      const payload = {
        name: this.name,
        description: this.description,
        visibility: this.visibility
      }

      this.createGroup(payload)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error.response)
          if (error.response.status === 422) {
            this.externalErrors = error.response.data.data_errors
          } else {
            this.message = 'Unexpected error creating the group'
            this.msgType = 'danger'
          }
          this.serverRequestInProgress = false
        })
    }
  }
}
</script>
