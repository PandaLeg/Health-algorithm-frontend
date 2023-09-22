<template>
  <div class="registration-patient__name">
    <div
        class="registration-patient__firstName"
        :class="{'form-error': v$.patient.firstName.$error}"
    >
      <label>First Name *</label>
      <input
          v-model="modelFirstName"
          placeholder="Enter first name"
          required
          @input="v$.patient.firstName.$touch"
          @blur="v$.patient.firstName.$touch"
      />
      <div
          v-for="error in v$.patient.firstName.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
    <div
        class="registration-patient__lastName"
        :class="{'form-error': v$.patient.lastName.$error}"
    >
      <label>Last Name *</label>
      <input
          v-model="modelLastName"
          placeholder="Enter last name"
          required
          @input="v$.patient.lastName.$touch"
          @blur="v$.patient.lastName.$touch"
      />
      <div
          v-for="error in v$.patient.lastName.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
  </div>
  <div
      class="registration-patient__city"
      :class="{'form-error': v$.patient.city.$error}"
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
        v-for="error in v$.patient.city.$errors"
        :key="error.$uid"
        class="input-error"
    >
      {{ error.$message }}
    </div>
  </div>
</template>

<script>

import {watchAndGetCities} from "../../hooks/registration/get-cities-clinic.hook";
import VAutocomplete from "../custom/VAutocomplete.vue";
import {computed} from "vue";

export default {
  name: "RegistrationPatientForm",
  components: {VAutocomplete},
  props: {
    v$: {
      type: Object,
      required: true
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
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
  },
  setup(props, {emit}) {
    const modelFirstName = computed({
      get: () => props.firstName,
      set: (val) => emit('update:first-name', val)
    })

    const modelLastName = computed({
      get: () => props.lastName,
      set: (val) => emit('update:last-name', val)
    })

    const modelCity = computed({
      get: () => props.city,
      set: (val) => emit('update:city', val)
    })

    const modelSearchCity = computed({
      get: () => props.searchCity,
      set: (val) => emit('update:search-city', val)
    })

    watchAndGetCities(modelSearchCity, emit)

    return {
      modelFirstName,
      modelLastName,
      modelCity,
      modelSearchCity
    }
  },
}
</script>

<style lang="scss">
@import "src/assets/scss/variables";

.registration-patient {
  &__name {
    display: flex;
    gap: 10px;

    @media screen and (max-width: $md4 + px) {
      flex-direction: column;
    }
  }

  &__firstName, &__lastName {
    flex: 0 1 50%;

    @media screen and (max-width: $md4 + px) {
      flex-basis: 100%
    }
  }
}
</style>
