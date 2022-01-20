<template>
  <div class="form-group mb-3">
    <label
      :for="name"
      class="mb-1"
      v-if="labelText">{{labelText}}
    </label>
    <input
      :name="name"
      type="text"
      :class="'form-control ' + layoutClass"
      :placeholder="placeholder"
      :value="modelValue"
      :readonly="serverRequestInProgress"
      :autocomplete="autocomplete"
      @blur="checkValue"
      @input="handleInput">
    <div v-if="errorsToShow.length > 0">
      <!-- eslint-disable --> 
      <p v-for="e in errorsToShow" class="fw-italic text-danger m-0 p-0">{{e}}</p>
      <!-- eslint-enable -->
    </div>
  </div>
</template>
<script>

import FieldValidations from './FieldValidations'

export default {
  name: 'InputText',

  props: {
    name: { type: String, required: true },
    modelValue: { type: String, required: true },
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
    checkValue () {
      this.internalErrors = FieldValidations.validate(this.modelValue, this.validationRules)
    }
  }
}
</script>
