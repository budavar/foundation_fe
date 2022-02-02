<template>
  <div>
    <label
      :class="labelClass"
      v-if="labelText">{{labelText}}
    </label>
  </div>
  <ol class="mb-1">
    <li v-for="(line, index) in inputField" :key="name + '-' + index">
      <InputText
        :name="name + '.' + index"
        :placeHolder="placeholder"
        v-model="inputField[index]"
        form-group-plus="mb-1"
        :layout-class="layoutClass"
        :externalErrors="externalErrors"
        :validation-rules="validationRules"
        :server-request-in-progress="serverRequestInProgress">
        <template v-slot:suffix-icon>
          <span class="input-group-text isClickable" @click="removeLine(index)">
            <font-awesome-icon :icon="['far', 'trash-alt']" class="me-2 text-danger" />
          </span>
        </template>
      </InputText>
    </li>
  </ol>
  <div class="text-center mb-2">
    <span v-if="inputField.length < allowMaximumLines" class="isClickable" @click="addLine()">
      <font-awesome-icon icon="plus-circle" class="me-2 text-success" />
    </span>
  </div>
</template>
<script>

import InputText from './InputText'

export default {
  name: 'InputTextLInes',

  components: {
    InputText
  },

  props: {
    name: { type: String, required: true },
    modelValue: { type: Array, required: true },
    placeholder: { type: String, default: null },
    externalErrors: { default: {} },
    layoutClass: { type: String, default: null },
    labelClass: { type: String, default: 'mb-1 input-label-style' },
    autocomplete: { type: String, default: null },
    labelText: { type: String, default: null },
    displayMinimumLines: { type: Number, default: 3 },
    allowMaximumLines: { type: Number, default: 10 },
    validationRules: { default: [] },
    serverRequestInProgress: { default: false }
    // emits: [ 'update:modelValue' ]
  },

  data () {
    return {
      inputField: []
    }
  },

  watch: {
    inputfield: {
      deep: true,
      handler (newVal, oldVal) {
        this.$emit('update:modelValue', newVal)
      }
    },
    modelValue: {
      deep: true,
      handler (newVal, oldVal) {
        if (this.inputField !== newVal) {
          this.inputField = newVal
          while (this.inputField.length < this.displayMinimumLines) {
            this.addLine()
          }
        }
      }
    }
  },

  methods: {
    addLine () {
      this.inputField.push('')
    },
    removeLine (index) {
      this.inputField.splice(index, 1)
      while (this.inputField.length < this.displayMinimumLines) {
        this.addLine()
      }
    }
  }
}
</script>
