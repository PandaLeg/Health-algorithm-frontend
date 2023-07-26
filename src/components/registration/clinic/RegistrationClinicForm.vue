<template>
  <div
      class="registration-clinic__name"
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
    <div
        v-for="error in v$.clinic.name.$errors"
        :key="error.$uid"
        class="input-error"
    >
      {{ error.$message }}
    </div>
  </div>
  <div
      class="registration-clinic__description"
      :class="{'form-error': v$.clinic.description.$error}"
  >
    <label>Description *</label>
    <textarea
        v-model="modelDescription"
        placeholder="Describe your clinic"
        required
        @input="v$.clinic.description.$touch"
        @blur="v$.clinic.description.$touch"
    />
    <div
        v-for="error in v$.clinic.description.$errors"
        :key="error.$uid"
        class="input-error"
    >
      {{ error.$message }}
    </div>
  </div>
  <div
      class="registration-clinic__type"
      :class="{'form-error': v$.clinic.clinicType.$error}"
  >
    <label>Type of clinic *</label>
    <VSelect
        v-model="modelClinicType"
        :options="clinicTypes"
        item-title="name"
        item-value="id"
        label="Select type of clinic"
    />
    <div
        v-for="error in v$.clinic.clinicType.$errors"
        :key="error.$uid"
        class="input-error"
    >
      {{ error.$message }}
    </div>
  </div>
  <div class="registration-clinic__conveniences">
    <label>Conveniences *</label>
    <VAutocomplete
        v-model="modelConveniences"
        :items="conveniencesFromDb"
        item-title="name"
        item-value="id"
        label="Select convenience"
        multiple
    />
  </div>
  <slot></slot>
</template>

<script>
import VAutocomplete from "../../custom/VAutocomplete.vue";
import VSelect from "../../custom/VSelect.vue";

export default {
  name: "RegistrationClinicForm",
  components: {VSelect, VAutocomplete},
  props: {
    v$: {required: true},
    name: {required: true},
    description: {required: true},
    clinicType: {required: true},
    clinicTypes: {required: true},
    conveniences: {required: true},
    conveniencesFromDb: {required: true},
  },
  computed: {
    modelName: {
      get() {
        return this.name
      },

      set(value) {
        this.$emit('update:name', value)
      }
    },
    modelDescription: {
      get() {
        return this.description
      },

      set(value) {
        this.$emit('update:description', value)
      }
    },
    modelClinicType: {
      get() {
        return this.clinicType
      },

      set(value) {
        this.$emit('update:clinicType', value)
      }
    },
    modelConveniences: {
      get() {
        return this.conveniences
      },

      set(value) {
        this.$emit('update:conveniences', value)
      }
    },
  }
}
</script>

<style scoped lang="scss">

</style>
