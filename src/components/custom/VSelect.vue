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
        :key="`k-${itemValue ? option[itemValue] : option}`"
        :value="itemValue ? option[itemValue] : option"
    >
      {{ itemTitle ? option[itemTitle] : option }}
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
    },
    itemValue: {
      type: String,
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
