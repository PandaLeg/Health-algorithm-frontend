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
        v-model:search="item.searchCity"
        :items="item.cities"
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

import {watchAndGetCities} from "../../hooks/registration/doctor/get-cities-clinic.hook";
import VAutocomplete from "../custom/VAutocomplete.vue";

export default {
  name: "RegistrationPatientForm",
  components: {VAutocomplete},
  props: {
    v$: {required: true},
    firstName: {required: true,},
    lastName: {required: true,},
    city: {required: true,},
    item: {required: true}
  },
  setup(props) {
    watchAndGetCities(props)
  },
  computed: {
    modelFirstName: {
      get() {
        return this.firstName
      },

      set(value) {
        this.$emit('update:first-name', value)
      }
    },
    modelLastName: {
      get() {
        return this.lastName
      },

      set(value) {
        this.$emit('update:last-name', value)
      }
    },
    modelCity: {
      get() {
        return this.city
      },

      set(value) {
        this.$emit('update:city', value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.registration-patient {
  &__name {
    display: flex;
    gap: 10px;
  }

  &__firstName, &__lastName {
    flex: 1 1 50%;
  }
}
</style>
