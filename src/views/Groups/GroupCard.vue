<template>
  <div class="card mb-3 isClickable" @click="showGroup">
    <img src="https://via.placeholder.com/480x270.png">
    <div class="card-body">
      <h5 class="card-title">{{group.name}}</h5>
      <p class="card-text">{{group.description.length > 200 ? group.description.substring(0,195) + ' ....': group.description}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GroupCard',

  props: {
    group: { type: Object, required: true }
  },

  methods: {
    showGroup () {
      if (this.group.my_member.status === 'active') {
        this.$router.push('/groups/' + this.group.id)
      } else {
        alert('oops')
      }
    }
  }
}
</script>
