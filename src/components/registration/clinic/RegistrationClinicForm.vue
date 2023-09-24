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
  <slot></slot>
</template>

<script>
import VAutocomplete from "../../custom/VAutocomplete.vue";
import VSelect from "../../custom/VSelect.vue";
import {computed} from "vue";

export default {
  name: "RegistrationClinicForm",
  components: {VSelect, VAutocomplete},
  props: {
    v$: {required: true},
    name: {required: true},
    description: {required: true},
    clinicType: {required: true},
    clinicTypes: {required: true},
  },
  setup(props, {emit}) {
    const modelName = computed({
      get: () => props.name,
      set: (val) => emit('update:name', val)
    })

    const modelDescription = computed({
      get: () => props.description,
      set: (val) => emit('update:description', val)
    })

    const modelClinicType = computed({
      get: () => props.clinicType,
      set: (val) => emit('update:clinic-type', val)
    })

    return {
      modelName,
      modelDescription,
      modelClinicType,
    }
  },
}
</script>

<style scoped lang="scss">

</style>
