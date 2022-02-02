<template>
  <div class="form-group" :class="formGroupPlus">
    <label
      :for="name"
      :class="labelClass"
      v-if="labelText">{{labelText}}
    </label>
    <div :class="'input-group ' + layoutClass">
      <input
        :name="name"
        type="text"
        class="form-control"
        :placeholder="placeholder"
        :value="modelValue"
        :readonly="serverRequestInProgress"
        :autocomplete="autocomplete"
        @blur="checkValue"
        @input="handleInput">
      <slot name="suffix-icon"></slot>
    </div>
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
    formGroupPlus: { type: String, default: 'mb-3' },
    layoutClass: { type: String, default: null },
    labelClass: { type: String, default: 'mb-1 input-label-style' },
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
