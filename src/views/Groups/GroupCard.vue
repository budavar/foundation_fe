<template>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">{{group.name}}</h5>
      <p class="card-text">{{group.description}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GroupCard',

  props: {
    group: { type: Object, required: true }
  }
}
</script>
