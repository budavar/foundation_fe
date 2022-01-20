<template>
  <div class="text-center">
    <img src="@/assets/gifs/circleDots.gif" alt="... Loading ..." :style="'width: auto; height: ' + loaderSize()"/>
  </div>
</template>

<script>
export default {
  name: 'DataLoading',

  props: {
    gifsize: { type: String, default: 'sm' }
  },

  methods: {
    loaderSize () {
      if (this.gifsize === 'lg') { return '300px' }
      if (this.gifsize === 'md') { return '200px' }
      if (this.gifsize === 'sm') { return '100px' }
    }
  }
}
</script>
