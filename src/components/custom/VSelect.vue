<template>
    <select v-model="selectModel">
        <option
            value=""
            disabled
            selected
        >
            Выберите из списка
        </option>
        <option
                v-for="option in options"
                :key="`k-${option.id}`"
                :value="option.id"
        >
            {{ option.name }}
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
        }
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
