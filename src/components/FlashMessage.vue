<template>
    <div>
      <div v-if="message !== null" class="m-2 p-3 alert" :class="messageColours()" role="alert">
        {{message}}
      </div>
    </div>
</template>

<script>
export default {
  name: "FlashMessage",
  props: {
    message: {
      type: String,
      default: null
    },
    msgType: {
      type: String,
      default: 'success'
    }
  },

  data () {
    return {
      showMessage: null,
      msgTick: null
    }
  },

  watch: {
    message: function (newValue, oldValue) {
      if (newValue !== oldValue && newValue !== null) {
        this.clearTick()
        this.msgTick = setTimeout(() => {
          this.$emit('clear-message')
        }, 3000)
      }
    }
  },

  beforeUnmount () {
    this.clearTick()
  },

  methods: {
    clearTick () {
      if (this.msgTick) {
        clearTimeout(this.msgTick)
      }
      this.msgTick = null
    },
    messageColours () {
      switch (this.msgType) {
        case 'success':
          return 'alert-success'
        case 'warning':
          return 'alert-warning'
        case 'danger':
          return 'alert-danger'
        case 'info':
          return 'alert-info'
      }
    }
  }
}
</script>
