<template>
  <div class="text-center">
    <div v-if="moreToShow">
      <div v-if="!loading">
        <button class="btn btn-outline-primary" @click="loadMore">Show More</button>
      </div>
      <img v-if="loading" :src="gif" alt="... Loading ..."/>
    </div>
    <div v-else class="text-info">
      End of list
    </div>
  </div>
</template>
<script>
export default {
  name: 'MoreToLoad',

  props: {
    moreToShow: { type: Boolean, required: true },
    showGif: { type: Boolean, required: true }
  },

  data () {
    return {
      gif: require('@/assets/gifs/more_to_load.gif'),
      loading: false
    }
  },

  watch: {
    showGif: {
      handler (newVal, oldVal) {
        this.loading = newVal
      }
    }
  },

  methods: {
    loadMore () {
      this.loading = true
      this.$emit('load-more')
    }
  }
}
</script>
