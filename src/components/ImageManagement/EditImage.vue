<template>
  <div>

    <div class="row justify-content-center">
      <div>
        <div class="img-cropper">
          <vue-cropper
            ref="cropper"
            :aspect-ratio="aspectRatio"
            :src="imageSource"
            preview=".preview"
          />
        </div>
        <div class="mt-2 actions">
          <div class="text-center">
            <button type="button" class="ms-1 me-1 btn btn-outline-primary" @click="rotate(90)"><i class="fas fa-redo"></i></button>
            <button type="button" class="ms-1 me-1 btn btn-outline-primary" @click="rotate(-90)"><i class="fas fa-undo"></i></button>
            <button type="button" class="ms-1 me-1 btn btn-outline-primary" @click="flipX"><i class="fas fa-arrows-alt-v"></i></button>
            <button type="button" class="ms-1 me-1 btn btn-outline-primary" @click="flipY"><i class="fas fa-arrows-alt-h"></i></button>
          </div>
        </div>
      </div>
      <div v-if="showEditPreview" class="mt-4 preview-area text-center">
        <p class="mb-2">Preview</p>
        <div class="preview"/>
      </div>
      <div class="mt-2 mb-2 text-center">
        <button type="button" class="me-2 btn btn-outline-primary" @click="cropImage">Use Cropped Image<i class="ms-2 fas fa-crop-alt"></i></button>
        <button type="button" class="ms-2 btn btn-outline-danger" @click="$emit('cancel-crop')">Cancel<i class="ms-2 fas fa-ban"></i></button>
      </div>
    </div>

  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  name: 'EditImage', 

  components: {
    VueCropper,
  },

  props: [
    'imageSource'
  ],

  props: {
    imageSource: {},
    aspectRatio: {default: 16/9},
    showEditPreview: {default: true}
  },

  data() {
    return {
      imgSrc: '/site_images/the_bears_butt.jpg',
      cropImg: '',
      showImage: true,
      showCropper: false
    };
  },

  mounted() {
          this.$refs.cropper.replace(this.imageSource);
  },

  methods: {
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.$emit('cropped-image', this.$refs.cropper.getCroppedCanvas().toDataURL() )
    },

    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute('data-scale', scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute('data-scale', scale);
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },
  },
};
</script>

<style scoped>
.cropper-area {
  width: 650px;
}
.preview-area {
  width: 400px;
}
.preview {
  width: 100%;
  height: calc(400px * (9 / 16));
  overflow: hidden;
}
.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}
.cropped-image img {
  max-width: 100%;
  width: 650px;
}
</style>