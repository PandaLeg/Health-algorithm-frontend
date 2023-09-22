<template>
  <div class="doctors__search search-doctor">
    <div class="search-doctor__wrapper">
      <div class="search-doctor__title">
        <h2>Search doctor</h2>
      </div>
      <div class="search-doctor__main">
        <div class="search-doctor__city">
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
        </div>
        <div class="search-doctor__specialties">
          <label>Specialties</label>
          <VAutocomplete
              v-model="modelSpecialty"
              :items="specialties"
              :disabled="isDoctorFieldsDisabled"
              item-title="name"
              item-value="id"
              label="Select the specialty"
          />
        </div>
        <div class="search-doctor__names">
          <label>Names</label>
          <VAutocomplete
              v-model="modelDoctorName"
              v-model:search="modelSearchDoctorName"
              :items="names"
              :disabled="isDoctorFieldsDisabled"
              item-title="name"
              item-value="doctorId"
              label="Write last name of doctor"
              dynamic
          />
        </div>
      </div>
      <div class="search-doctor__action">
        <button @click="$emit('search')">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
import VAutocomplete from "../custom/VAutocomplete.vue";
import {watchAndGetCities} from "../../hooks/registration/get-cities-clinic.hook";
import {computed} from "vue";
import watchAndGetNamesHook from "../../hooks/doctor/doctor-search/watch-and-get-names.hook";

export default {
  name: "SearchDoctor",
  components: {VAutocomplete},
  props: {
    city: {
      required: true,
      validator: (val) => typeof val === 'string' || val === null
    },
    searchCity: {
      type: String,
      required: true
    },
    searchedCities: {
      type: Array,
      required: true
    },
    specialty: {
      required: true,
      validator: (val) => typeof val === 'number' || val === null
    },
    searchDoctorName: {
      type: String,
      required: true
    },
    doctorName: {
      required: true,
      validator: (val) => typeof val === 'string' || val === null
    },
    specialties: {
      type: Array,
      required: true
    },
    names: {
      type: Array,
      required: true
    },
    isDoctorFieldsDisabled: {
      type: Boolean,
      required: true
    },
  },
  setup(props, {emit}) {
    const modelCity = computed({
      get: () => props.city,
      set: (val) => emit('update:city', val)
    })

    const modelSearchCity = computed({
      get: () => props.searchCity,
      set: (val) => emit('update:search-city', val)
    })

    const modelSpecialty = computed({
      get: () => props.specialty,
      set: (val) => emit('update:specialty', val)
    })

    const modelDoctorName = computed({
      get: () => props.doctorName,
      set: (val) => emit('update:doctor-name', val)
    })

    const modelSearchDoctorName = computed({
      get: () => props.searchDoctorName,
      set: (val) => emit('update:search-doctor-name', val)
    })

    watchAndGetCities(modelSearchCity, emit)
    watchAndGetNamesHook(modelSearchDoctorName, props, emit)

    return {
      modelCity,
      modelSearchCity,
      modelSpecialty,
      modelDoctorName,
      modelSearchDoctorName
    }
  }
}
</script>


<style scoped lang="scss">

</style>
