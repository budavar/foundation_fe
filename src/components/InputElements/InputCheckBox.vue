<template>
  <div class="form-check" :class="layoutClass">
    <input
      :name="name"
      type="checkbox"
      :checked="checked"
      class="form-check-input"
      :disabled="serverRequestInProgress"
      @input="(event) => $emit('update:checked', event.target.checked)">
    <label
      :for="name"
      class="form-check-label">
      {{ label }}
    </label>
  </div>
</template>
<script>

export default {
  name: 'InputCheckBox',

  props: {
    name: { type: String, required: true },
    checked: { type: Boolean, required: true },
    label: { type: String, required: true },
    layoutClass: { type: String, default: null },
    serverRequestInProgress: { default: false }
  }
}
</script>
