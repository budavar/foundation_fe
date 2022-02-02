<template>
  <div class="form-group mb-3">
    <div>
      <label
        :for="name"
        :class="labelClass"
        v-if="labelText">{{labelText}}
      </label>
    </div>
    <!-- eslint-disable --> 
    <div v-for="(option, index) in radioOptions" class="form-check" :class="radioLayout == 'horizontal' ? 'd-inline-block me-4' : ''">
      <input
        :id="name + '-' + index"
        :name="name" 
        :class="'form-check-input ' + layoutClass" 
        type="radio"  
        :checked="modelValue == option.value" 
        :value="option.value"
        v-model="modelValue"
        :disabled="serverRequestInProgress"
        @input="handleInput">
      <label class="form-check-label" :for="name + '-' + index">
        {{option.label}}
      </label>
    </div>
    <div v-if="errorsToShow.length > 0">
      <p v-for="e in errorsToShow" class="fw-italic text-danger m-0 p-0">{{e}}</p>
    </div>
    <!-- eslint-enable -->
  </div>
</template>
<script>

export default {
  name: 'InputRadio',

  props: {
    name: { type: String, required: true },
    modelValue: { type: String, required: true },
    radioLayout: { type: String, default: 'vertical' },
    radioOptions: { type: Array },
    placeholder: { type: String, default: null },
    externalErrors: { default: {} },
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
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
