<template>
  <select v-model="selectModel">
    <option
        value=""
        disabled
        selected
    >
      {{ label }}
    </option>
    <option
        v-for="option in options"
        :key="`k-${option[itemValue]}`"
        :value="option[itemValue]"
    >
      {{ option[itemTitle] }}
    </option>
  </select>
</template>

<script>
export default {
  name: "VSelect",
  props: {
    options: {
      type: Array,
      default: () => []
    },
    modelValue: {
      required: true
    },
    itemTitle: {
      type: String,
      required: true
    },
    itemValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Select from list'
    },
  },
  computed: {
    selectModel: {
      get() {
        return this.modelValue
      },

      set(event) {
        this.$emit('update:modelValue', event)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/ui";

select {
  @extend %field-reg;
  font-size: 16px;
}

</style>
