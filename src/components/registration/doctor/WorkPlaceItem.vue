<template>
  <div
      class="registration-doctor__clinic-city"
      :class="{'form-error': v.city.$error}"
  >
    <label>City *</label>
    <VAutocomplete
        v-model="modelCity"
        v-model:search="modelSearchCity"
        :items="searchedCities"
        item-title="name"
        item-value="name"
        label="Write the name of city"
        dynamic
    />
    <div
        v-for="error in v.city.$errors"
        :key="error.$uid"
        class="input-error"
    >
      {{ error.$message }}
    </div>
  </div>
  <div
      v-if="modelCity"
      class="registration-doctor__clinic-name"
      :class="{'form-error': v.clinicName.$error}"
  >
    <label>Clinic *</label>
    <VAutocomplete
        v-model="modelClinicName"
        v-model:search="modelSearchClinic"
        :items="searchedClinics"
        item-title="name"
        item-value="clinicId"
        label="Write the name of clinic"
        dynamic
    />
    <div
        v-for="error in v.clinicName.$errors"
        :key="error.$uid"
        class="input-error"
    >
      {{ error.$message }}
    </div>
  </div>
  <div
      v-if="modelCity && modelClinicName && addresses.length"
      class="registration-doctor__clinic-address"
      :class="{'form-error': v.address.$error}"
  >
    <label>Address *</label>
    <VSelect
        v-model="modelAddress"
        :options="addresses"
        item-title="address"
        item-value="id"
        label="Select address"
    />
    <div
        v-for="error in v.address.$errors"
        :key="error.$uid"
        class="input-error"
    >
      {{ error.$message }}
    </div>
  </div>
</template>

<script>
import VAutocomplete from "../../custom/VAutocomplete.vue";
import {
  watchAndGetCities,
  watchAndGetClinics,
  watchAndGetAddresses
} from "../../../hooks/registration/get-cities-clinic.hook";
import {computed, onMounted} from "vue";
import VSelect from "../../custom/VSelect.vue";

export default {
  name: "WorkPlaceForm",
  components: {VSelect, VAutocomplete},
  props: {
    city: {required: true},
    clinicName: {required: true},
    address: {required: true},
    searchCity: {required: true},
    searchClinic: {required: true},
    searchedCities: {required: true},
    searchedClinics: {required: true},
    addresses: {required: true},
    v: {required: true},
    workPlaceVuelidate: {default: () => []},
  },
  setup(props, {emit}) {
    const modelCity = computed({
      get: () => props.city,
      set: (val) => emit('update:city', val)
    })

    const modelClinicName = computed({
      get: () => props.clinicName,
      set: (val) => emit('update:clinic-name', val)
    })

    const modelAddress = computed({
      get: () => props.address,
      set: (val) => emit('update:address', val)
    })

    const modelSearchCity = computed({
      get: () => props.searchCity,
      set: (val) => emit('update:search-city', val)
    })

    const modelSearchClinic = computed({
      get: () => props.searchClinic,
      set: (val) => emit('update:search-clinic', val)
    })

    watchAndGetCities(modelSearchCity, emit)
    watchAndGetClinics(modelSearchClinic, modelCity, emit)
    watchAndGetAddresses(modelClinicName, modelCity, emit)

    onMounted(() => {
      emit('update:work-place-vuelidate', [...props.workPlaceVuelidate, props.v])
    })

    return {
      modelCity,
      modelClinicName,
      modelAddress,
      modelSearchCity,
      modelSearchClinic
    }
  },
}
</script>

<style scoped lang="scss">
.registration-doctor {
  &__clinic-city, &__clinic-name, &__clinic-address {
    margin-bottom: 15px;
  }
}
</style>
