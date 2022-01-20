<template>
  <form @submit.prevent="updateAvatar">

    <h5 class="hd-style">Profile Avatar</h5>
    <hr/>
    <div class="text-center p-2">
      <InputSelectImage
        @selected-image="img=$event"/>
      <hr/>
    </div>

    <div v-if="img.src == null" class="d-flex justify-content-center">
      <div>
        <Avatar
          :username="authUser.name"
          :src="authUser.avatar == null ? null : avatarLocation + authUser.avatar"
          :rounded="authUser.avatar == null ? true : false"
          :size=200>
        </Avatar>
      </div>
    </div>
    <FlashMessage :message="message" :msg-type="msgType" @clear-message="message = null" />

    <div v-if="img.src != null">
      <cropper
        class="cropper"
        :src="img.src"
        :debounce="false"
        ref="avatarImage"
        :stencil-props="{
          aspectRatio: 1
        }"
        @change="change"
      ></cropper>
      <hr/>
      <preview
        class="text-center"
        :width="120"
        :height="120"
        :image="result.image"
        :coordinates="result.coordinates"
      />

      <div class="mt-4 text-center">
        <button class="btn btn-outline-danger me-4" type="button" :disabled="serverRequestInProgress" @click="discard()">Discard</button>
        <button class="btn btn-primary" type="submit" :disabled="serverRequestInProgress">Save</button>
      </div>

    </div>
  </form>
</template>

<script>

import { mapGetters } from "vuex"
/* eslint-disable */
import { fileLocations } from "@/config/BaseConfig"
/* eslint-enable */
import { Cropper, Preview } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import Avatar from '@/components/Avatar'
import InputSelectImage from '@/components/InputElements/InputSelectImage'
import FlashMessage from "@/components/FlashMessage"
import AuthService from "@/services/AuthService"

export default {
  name: "ProfileAvatarForm",

  components: {
    InputSelectImage,
    Cropper,
    Preview,
    Avatar,
    FlashMessage
  },

  data () {
    return {
      serverRequestInProgress: false,
      externalErrors: null,
      avatarLocation: fileLocations.avatars,
      message: null,
      msgType: null,
      img: {
        src: null,
        type: null
      },
      result: {
        coordinates: null,
        image: null
      }
    }
  },

  computed: {
    ...mapGetters("auth", ["authUser"])
  },

  mounted () { },

  methods: {
    change ({ coordinates, image }) {
      this.result = {
        coordinates,
        image
      }
    },
    discard () {
      this.img.src = null
      this.img.type = null
    },
    updateAvatar () {
      this.serverRequestInProgress = true
      const { canvas } = this.$refs.avatarImage.getResult()
      if (canvas) {
        const form = new FormData()
        canvas.toBlob(blob => {
          form.append('avatar_image', blob)
          /* eslint-disable */
          AuthService.updateMyAvatar(form)
            .then((response) => {
              this.message = response.data.status_details
              this.msgType = "success"
              this.externalErrors = null
              this.img = {src: null, type: null}
            })
            .then(() => this.$store.dispatch("auth/getAuthUser"))
            // .then(() => { 
              // this.$store.dispatch("auth/getAuthUser")
              // this.img = {src: null, type: null}
            // })
            .catch((error) => (this.externalErrors = error.response.data.errors))
            .finally(this.serverRequestInProgress = false)
          /* eslint-enable */
        }, 'image/png')
      }
    }
  }
}
</script>

<style>
.cropper {
  height: 400px;
  background: #DDD;
}
</style>
