<template>
  <div class="clinics__search search-clinic">
    <div class="search-clinic__wrapper">
      <div class="search-clinic__title">
        <h2>Search clinic</h2>
      </div>
      <div class="search-clinic__main">
        <div
            class="search-clinic__city"
            :class="{'form-error': v$.city.$error}"
        >
          <label>City</label>
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
              v-for="error in v$.city.$errors"
              :key="error.$uid"
              class="input-error"
          >
            {{ error.$message }}
          </div>
        </div>
        <div class="search-clinic__name">
          <label>Clinic</label>
          <VAutocomplete
              v-model="modelClinic"
              v-model:search="modelSearchClinic"
              :items="searchedClinics"
              :disabled="isClinicDisabled"
              item-title="name"
              item-value="clinicId"
              label="Write the name of clinic"
              dynamic
          />
        </div>
      </div>
      <div class="search-clinic__action">
        <button @click="$emit('search')">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
import VAutocomplete from "../custom/VAutocomplete.vue";
import {computed} from "vue";
import {watchAndGetCities, watchAndGetClinics} from "../../hooks/registration/get-cities-clinic.hook";

export default {
  name: "SearchClinic",
  props: {
    v$: {required: true},
    city: {required: true},
    clinic: {required: true},
    searchCity: {required: true},
    searchClinic: {required: true},
    searchedCities: {required: true},
    searchedClinics: {required: true},
    isClinicDisabled: {required: true}
  },
  components: {VAutocomplete},
  setup(props, { emit }) {
    const modelCity = computed({
      get: () => props.city,
      set: (val) => emit('update:city', val)
    })

    const modelClinic = computed({
      get: () => props.clinic,
      set: (val) => emit('update:clinic', val)
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

    return {
      modelCity,
      modelClinic,
      modelSearchCity,
      modelSearchClinic
    }
  }
}
</script>


<style scoped lang="scss">

</style>
