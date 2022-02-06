<template>
  <div class="form-group mb-3">
    <label
      :for="name"
      class="mb-1"
      v-if="labelText">{{labelText}}
    </label>
    <div :class="'input-group ' + layoutClass">
      <input
        :name="name"
        type="text"
        class="form-control"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput">
      <span class="input-group-text isClickable" @click="this.$emit('update:modelValue', '')">
        <font-awesome-icon :icon="['far', 'times-circle']" class="text-secondary" />
      </span>
      <span class="input-group-text isClickable"  :class="modelValue.trim().length > 0 || allowEmptySearch === true ? 'bg-success text-white' : 'text-secondary'" @click="startSearch">
        <font-awesome-icon icon="search" />
      </span>
    </div>
    <div v-if="errorsToShow.length > 0">
      <!-- eslint-disable --> 
      <p v-for="e in errorsToShow" class="fw-italic text-danger m-0 p-0">{{e}}</p>
      <!-- eslint-enable -->
    </div>
  </div>
</template>
<script>

export default {
  name: 'InputSearch',

  props: {
    name: { type: String, required: true },
    modelValue: { type: String, required: true },
    allowEmptySearch: { type: Boolean, default: false },
    placeholder: { type: String, default: null },
    externalErrors: { default: {} },
    layoutClass: { type: String, default: null },
    labelClass: { type: String, default: null },
    autocomplete: { type: String, default: null },
    labelText: { type: String, default: null },
    validationRules: { default: [] },
    serverRequestInProgress: { default: false }
    // emits: [ 'update:modelValue' ]
  },

  data () {
    return {
      inputField: null,
      internalErrors: []
    }
  },

  computed: {
    errorsToShow () {
      if (this.externalErrors != null &&
        Object.prototype.hasOwnProperty.call(this.externalErrors, this.name)) {
        return [...this.externalErrors[this.name], ...this.internalErrors]
      } else {
        return this.internalErrors
      }
    }
  },

  methods: {
    handleInput (event) {
      if (event.target.value.trim().length > 0) {
        this.internalErrors = []
      }
      this.$emit('update:modelValue', event.target.value)
    },
    startSearch () {
      if (this.modelValue.trim().length > 0 || this.allowEmptySearch) {
        this.$emit('start-search')
      } else {
        this.internalErrors = ['Enter some search text then press search']
      }
    }
  }
}
</script>
