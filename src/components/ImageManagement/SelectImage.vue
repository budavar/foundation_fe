<template>
  <div>
    <div class="mt-2 mb-2 text-center">
      <input
        ref="input"
        type="file"
        name="imageSelect"
        @change="setImage"/>
      <div>
        <button v-if="buttonType == 'button'" type="button" class="btn btn-outline-success" @click="showFileChooser">{{buttonText}}<i class="ms-2 fas fa-image"></i></button>
        <span v-else class="p-2 text-success" @click="showFileChooser" @mouseover="mouseHover = true" @mouseleave="mouseHover = false">
           <span v-show="!mouseHover"><i class="far fa-2x fa-image"></i></span>
           <span v-show="mouseHover"><i class="fas fa-2x fa-image"></i></span>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SelectImage', 

  props: {
    buttonType: { default: 'button'},
    buttonText: { default: 'Select Image'}
  },

  data() {
    return {
      mouseHover: false,
      imgSrc: null
    };
  },

  methods: {

    setImage(e) {
      const file = e.target.files[0];
      if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          this.$emit('image-data', this.imgSrc)
        };
        reader.readAsDataURL(file);
      } else {
        alert('Sorry, FileReader API not supported');
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    }
  },
};
</script>

<style scoped>
  input[type="file"] {
    display: none;
  }
</style>