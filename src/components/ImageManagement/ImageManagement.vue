<template>
  <div>

    <div v-if="defaultImages.length > 0" class="text-center mt-2 mb-4">
      <p class="mb-2">Use one of the defaults or upload your own picture</p>
      <DefaultImageSelection
        :image-list="defaultImages"
        @image-selected="defaultSelected">
      </DefaultImageSelection>
    </div>

    <SelectImage v-if="selectImage && !showImageCropper"
      :button-text="selectImageText"
      @image-data="imageData">
    </SelectImage>

    <span v-if="!showImageCropper">
      <div class="mt-4 text-center" v-if="imgSrc != null">
        <img class="w-75" :src="imgSrc"/>
        <div class="mt-2 mb-2 ">
          <button type="button" class="btn btn-outline-primary" @click="showImageCropper = true">Edit Image <i class="ms-2 fas fa-edit"></i></button>
        </div>
      </div>
      <div v-else class="mt-4 text-center">
        <span v-if="imagePlaceholderType == 'photo'">
          <img class="w-75" :src="placeholder.photo.default"/>
        </span>
        <span v-if="imagePlaceholderType == 'avatar'">
          <img class="w-50" :src="placeholder.avatar.default"/>
        </span>
        <h3 v-if="imagePlaceholderText != null" class="mt-4 text-center text-danger bg-light p-4">No Image Selected</h3>
      </div>
    </span>

    <EditImage v-if="showImageCropper"
      :image-source="imgSrc"
      :aspect-ratio="aspectRatio"
      :show-edit-preview="showEditPreview"
      @cropped-image="croppedImage"
      @cancel-crop="cancelCropper">
    </EditImage>

  </div>
</template>
<script>

import SelectImage from "./SelectImage"
import EditImage from "./EditImage"
import DefaultImageSelection from "./DefaultImageSelection"
import imageManagementAPI from '../../api/imageManagementAPI'

export default {
  name: 'ImageEdit',

  components: {
    SelectImage, 
    EditImage, 
    DefaultImageSelection
  }, 

  props: {

    selectImage: { default: true },
    selectImageText: { default: 'Select Image' },
    cropImageText: { default: 'Crop Image' },
    cancelCropImageText: { default: 'Cancel' },
    showCropPreview: { default: false },
    aspectRatio: { default: 16/9 },
    showEditPreview: { default: true },
    editAfterSelect: { default: false },
    imageSaveOnSelect: { default: false },
    imageSaveOnCrop: { default: false },
    imagePlaceholderType: { default: 'photo' },
    imagePlaceholderText: { default: 'No Image Selected' },
    defaultImages: { default: [] },
    currentImage: { default: null }

  },

  data () {
    return {
      storage: require('../../config/storageLocations'),
      placeholder: {
        photo: require('../../assets/general_images/picture_placeholder.png'),
        avatar: require('../../assets/general_images/avatar_placeholder.png')
      },
      imageToCrop: null,
      showImageCropper: false,
      imgSrc: null,
      currentImgSrc: null
    }
  },  

  watch: {
    // whenever question changes, this function will run
    //imgSrc(newImage, oldImage) {
      //this.$emit('new-image-selected', newImage)
    //}
    currentImage(newImage, oldImage) {
      this.currentImgSrc = null
      this.imgSrc = null
      if (newImage != null) {
        this.returnImageData(this.storage.baseURL + newImage)
      }
    }
  },

  mounted() {
    if (this.currentImage != null) {
      this.returnImageData(this.storage.baseURL + this.currentImage)
      //this.getBase64FromImageUrl(this.storage.baseURL + this.currentImage)
    }
  },

  methods: {

    defaultSelected(src) {
      this.imgSrc = src
      this.showImageCropper = false
      this.$emit('new-image-selected', src)
    }, 

    imageData(src) {
      this.imgSrc = src
      this.showImageCropper = this.editAfterSelect
      if (this.imageSaveOnSelect) {
        this.$emit('new-image-selected-with-save', src)
      } else {
        this.$emit('new-image-selected', src)
      }
    }, 

    croppedImage(src) {
      this.imgSrc = src
      this.showImageCropper = false
      if (this.imageSaveOnCrop) {
        this.$emit('new-image-selected-with-save', src)
      } else {
        this.$emit('new-image-selected', src)
      }
    },

    cancelCropper(src) {
      this.showImageCropper = false
      this.imgSrc = this.currentImgSrc
    }, 
    
    returnImageData(imagePath) { 

      imageManagementAPI.getImage(imagePath)
        .then(response => {  
          let reader = new FileReader();
          reader.onload = (e) => {
            this.imgSrc = reader.result; 
            this.currentImgSrc = reader.result;
          }
          reader.readAsDataURL(response.data);
        })

    }

  }

}
</script>