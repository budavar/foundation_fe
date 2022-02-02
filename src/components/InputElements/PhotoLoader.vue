<template>
  <div>
    <div class="text-center p-2">
      <InputSelectImage
        @selected-image="img=$event"/>
    </div>

    <div v-if="img.src == null" class="d-flex justify-content-center">
      <img v-if="photoIdentifier === null" src="https://via.placeholder.com/480x270.png" class="w-100">
      <img v-else :src="photoLocation + photoIdentifier" class="w-100">
    </div>

    <div v-if="img.src != null">
      <cropper
        class="cropper"
        :src="img.src"
        :debounce="false"
        ref="photoRef"
        :stencil-props="{
          aspectRatio: aspectRatio
        }"
        @change="change"
      ></cropper>
      <hr/>
      <preview v-if="showPreview"
        class="text-center"
        :width="480"
        :height="270"
        :image="result.image"
        :coordinates="result.coordinates"
      />
    </div>
  </div>
</template>

<script>

/* eslint-disable */
import { fileLocations } from "@/config/BaseConfig"
/* eslint-enable */
import { Cropper, Preview } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import InputSelectImage from '@/components/InputElements/InputSelectImage'

export default {
  name: "PhotoLoader",

  props: {
    photoType: { type: String, required: true },
    photoIdentifier: { type: [String, null], required: true },
    showPreview: { type: Boolean, default: false },
    aspectRatio: { type: Number, default: 16 / 9 }
  },

  components: {
    InputSelectImage,
    Cropper,
    Preview
  },

  data () {
    return {
      photoLocation: fileLocations[this.photoType],
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

  watch: {
    photoIdentifier (newVal, oldVal) {
      this.img.src = null
      this.img.type = null
    }
  },

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
    getBlob () {
    /* eslint-disable */
      return new Promise((resolve, reject) => {
        if (this.img.src === null) {
          resolve('NO-IMAGE')
        } else {
          const { canvas } = this.$refs.photoRef.getResult()
          if (canvas) {
            canvas.toBlob(blob => {
              resolve(blob)
            }, 'image/png')
          } else {
            resolve(null)
          }
        }
      })
    /* eslint-enable */
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
