<template>
  <div class="row justify-content-center">
    <div v-for="image in imageList" class="col-lg-3 col-sm-6" @click="returnImageData(image.default)">
      <img class="w-100 mb-1 mt-1" :src="image.default"/>
    </div>
  </div>
</template>

<script>

import imageManagementAPI from '../../api/imageManagementAPI'

export default {
  name: 'DefaultImageSelection', 

  props: [
    'imageList'
  ],

  methods: {


    returnImageData(imagePath) { 

      imageManagementAPI.getImage(imagePath)
        .then(response => {  
          let reader = new FileReader();
          reader.onload = (e) => {this.$emit('image-selected', reader.result)};
          reader.readAsDataURL(response.data);
        })

    },

    returnImageSource(imagePath) {
      
var blob = null;
var xhr = new XMLHttpRequest();




xhr.open("GET", imagePath);
xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
xhr.onload = function()
{
    blob = xhr.response;//xhr.response is now a blob object

        let reader = new FileReader();
        reader.onload = (e) => {this.$emit('image-selected', reader.result)};
        reader.readAsDataURL(blob);



}
xhr.send();


    }
  }
}

/* function blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    })
} */

</script>