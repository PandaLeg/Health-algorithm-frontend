<template>
  <div
      class="registration-patient__name"
      :class="{'form-error': v$.clinic.name.$error}"
  >
    <label>Name *</label>
    <input
        v-model="modelName"
        placeholder="Enter clinic name"
        required
        @input="v$.clinic.name.$touch"
        @blur="v$.clinic.name.$touch"
    />
    <div class="input-error">
      {{ nameErrors[0] }}
    </div>
  </div>
  <slot></slot>
</template>

<script>
export default {
  name: "RegistrationClinicForm",
  props: {
    v$: {required: true},
    name: {required: true},
    nameErrors: {required: true},
  },
  computed: {
    modelName: {
      get() {
        return this.name
      },

      set(value) {
        this.$emit('update:name', value)
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
