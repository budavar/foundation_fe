<template>
  <div class="form-group mb-3">
    <label
      :for="name"
      :class="labelClass"
      v-if="labelText">{{labelText}}
    </label>
    <textarea
      :name="name"
      :class="'form-control ' + layoutClass"
      :placeholder="placeholder"
      :rows="rows"
      :value="modelValue"
      :readonly="serverRequestInProgress"
      @blur="checkValue"
      @input="handleInput">
    </textarea>
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
  name: 'InputTextArea',

  props: {
    name: { type: String, required: true },
    modelValue: { type: String, default: '', validator: (p) => typeof p === 'string' || p === null },
    placeholder: { type: String, default: null },
    externalErrors: { default: {} },
    layoutClass: { type: String, default: null },
    labelClass: { type: String, default: 'mb-1 input-label-style' },
    rows: { type: Number, default: 4 },
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
