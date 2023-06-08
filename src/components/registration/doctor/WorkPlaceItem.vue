<template>
  <div
      class="registration-doctor__clinic-city"
      :class="{'form-error': v$.doctor.places.$error && item.id === 1}"
  >
    <label>City *</label>
    <VAutocomplete
        v-model="item.city"
        v-model:search="item.searchCity"
        :items="item.cities"
        item-title="name"
        item-value="name"
        label="Write the name of city"
        dynamic
    />
  </div>
  <div
      v-if="item.city"
      class="registration-doctor__clinic-name"
      :class="{'form-error': v$.doctor.places.$error && item.id === 1}"
  >
    <label>Clinic *</label>
    <VAutocomplete
        v-model="modelPlaces"
        v-model:search="item.searchClinic"
        :items="item.clinics"
        item-title="name"
        item-value="id"
        label="Write the name of clinic"
        dynamic
    />
    <div
        v-if="item.id === 1"
        class="input-error"
    >
      {{ placesErrors[0] }}
    </div>
  </div>
</template>

<script>
import VAutocomplete from "../../custom/VAutocomplete.vue";
import getCitiesClinicHook from "../../../hooks/registration/doctor/get-cities-clinic.hook";

export default {
  name: "WorkPlaceForm",
  components: {VAutocomplete},
  props: {
    item: {required: true},
    places: {required: true},
    v$: {required: true},
    placesErrors: {required: true},
  },
  setup(props, {emit}) {
    const {modelPlaces} = getCitiesClinicHook(props, emit)

    return {
      modelPlaces
    }
  },
}
</script>

<style scoped lang="scss">
.registration-doctor {
  &__clinic-city, &__clinic-name {
    margin-bottom: 15px;
  }
}
</style>
