<template>
  <form @submit.prevent="updateGroup">

    <PhotoLoader v-if="getGroup.photo !== undefined"
      ref="photoLoader"
      photo-type="groups"
      :photo-identifier="getGroup.photo">
    </PhotoLoader>
    <hr/>
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
      :externalErrors="[]"
      :validation-rules="[]"
      :server-request-in-progress="true">
    </InputRadio>

    <InputRadio
      name="request_to_join_rule"
      v-model="request_to_join_rule"
      labelText="On Request to Join Group"
      layout-class="bg-soft-light"
      radio-layout="vertical"
      :radio-options="[
          { 'value' : 'automatic', 'label' : 'Automatic Approval'},
          { 'value' : 'approval', 'label' : 'Approval Required'}
        ]"
      :validation-rules="[]"
      :externalErrors="externalErrors"
      :server-request-in-progress="serverRequestInProgress">
    </InputRadio>

    <InputRadio
      name="allow_to_add_events"
      v-model="allow_to_add_events"
      labelText="Who can setup events"
      layout-class="bg-soft-light"
      radio-layout="vertical"
      :radio-options="[
          { 'value' : 'no-one', 'label' : 'Events not allowed'},
          { 'value' : 'owner', 'label' : 'Owner'},
          { 'value' : 'admin ', 'label' : 'Owner & Admins'},
          { 'value' : 'member', 'label' : 'All members'}
        ]"
      :validation-rules="[]"
      :externalErrors="externalErrors"
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

    <InputTextLines
      name="rules"
      placeholder="group rule"
      v-model="rules"
      labelText="Group Rules"
      layout-class="bg-soft-light"
      :external-errors="externalErrors"
      :validation-rules="['min-len.0', 'max-len.1000']"
      :server-request-in-progress="serverRequestInProgress">
    </InputTextLines>

    <div class="mt-4 mb-4">
      <FlashMessage :message="message" :msg-type="msgType" @clear-message="message = null" />
      <div class="d-grid gap-2">
        <button class="btn btn-primary" type="submit" :disabled="serverRequestInProgress">Create</button>
      </div>
    </div>
  </form>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import InputText from "@/components/InputElements/InputText"
import InputTextArea from "@/components/InputElements/InputTextArea"
import InputTextLines from "@/components/InputElements/InputTextLines"
import InputRadio from "@/components/InputElements/InputRadio"
import FlashMessage from "@/components/FlashMessage"
import PhotoLoader from '@/components/InputElements/PhotoLoader'

export default {
  name: "GroupEditForm",

  components: {
    InputTextArea,
    InputRadio,
    InputText,
    InputTextLines,
    FlashMessage,
    PhotoLoader
  },

  computed: {
    ...mapGetters('group', ['getGroup', 'error'])
  },

  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null,
      name: "",
      description: "",
      visibility: "",
      request_to_join_rule: "",
      allow_to_add_events: "",
      rules: [],
      message: null,
      msgType: null
    }
  },

  watch: {
    getGroup (newVal, oldVal) {
      if (this.getGroup !== {}) {
        this.description = this.getGroup.description
        this.visibility = this.getGroup.visibility
        this.rules = this.getGroup.rules
        this.name = this.getGroup.name
        this.request_to_join_rule = this.getGroup.request_to_join_rule
        this.allow_to_add_events = this.getGroup.allow_to_add_events
      }
    }
  },

  methods: {

    ...mapActions('group', ['updateGroupDetails']),

    updateGroup () {
      this.serverRequestInProgress = true
      this.$refs.photoLoader.getBlob()
        .then(blob => {
          console.log(blob)
          const form = new FormData()
          form.append('photo', blob)
          form.append('name', this.name)
          form.append('description', this.description)
          form.append('visibility', this.visibility)
          this.rules.forEach(rule => form.append('rules[]', rule))
          form.append('request_to_join_rule', this.request_to_join_rule)
          form.append('allow_to_add_events', this.allow_to_add_events)
          this.updateGroupDetails(form)
            .then(response => {
              this.serverRequestInProgress = false
              this.$emit('group-updated')
            })
            .catch(error => {
              this.externalErrors = error.response.data.data_errors
              this.message = 'Unexpected error updating the group detailss'
              this.msgType = 'danger'
              this.serverRequestInProgress = false
            })
        })
    }
  }
}
</script>
