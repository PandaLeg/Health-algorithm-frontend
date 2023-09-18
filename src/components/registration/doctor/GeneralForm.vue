<template>
  <div class="registration-doctor__name">
    <div
        class="registration-doctor__firstName"
        :class="{'form-error': v$.doctor.firstName.$error}"
    >
      <label>First Name *</label>
      <input
          v-model="modelFirstName"
          placeholder="Enter first name"
          required
          @input="v$.doctor.firstName.$touch"
          @blur="v$.doctor.firstName.$touch"
      />
      <div
          v-for="error in v$.doctor.firstName.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
    <div
        class="registration-doctor__lastName"
        :class="{'form-error': v$.doctor.lastName.$error}"
    >
      <label>Last Name *</label>
      <input
          v-model="modelLastName"
          placeholder="Enter last name"
          required
          @input="v$.doctor.lastName.$touch"
          @blur="v$.doctor.lastName.$touch"
      />
      <div
          v-for="error in v$.doctor.lastName.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
    <div
        class="registration-doctor__surname"
        :class="{'form-error': v$.doctor.surname.$error}"
    >
      <label>Surname *</label>
      <input
          v-model="modelSurname"
          placeholder="Enter surname"
          required
          @input="v$.doctor.surname.$touch"
          @blur="v$.doctor.surname.$touch"
      />
      <div
          v-for="error in v$.doctor.surname.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
  </div>
  <div class="registration-doctor__birth-price">
    <div class="registration-doctor__birth">
      <label>Date of birth</label>
      <input
          v-model="modelDateOfBirth"
          type="date"
          placeholder="Select date"
      />
    </div>
    <div
        class="registration-doctor__price"
        :class="{'form-error': v$.doctor.price.$error}"
    >
      <label>Price(₴) *</label>
      <input
          v-model="modelPrice"
          type="number"
          placeholder="Write price in ₴"
          required
          @input="v$.doctor.price.$touch"
          @blur="v$.doctor.price.$touch"
      />
      <div
          v-for="error in v$.doctor.price.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from "vue";

export default {
  name: "RegistrationDoctorForm",
  props: {
    v$: {required: true},
    firstName: {required: true,},
    lastName: {required: true,},
    surname: {required: true,},
    dateOfBirth: {required: true,},
    price: {required: true,},
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

    const modelSurname = computed({
      get: () => props.surname,
      set: (val) => emit('update:surname', val)
    })

    const modelDateOfBirth = computed({
      get: () => props.dateOfBirth,
      set: (val) => emit('update:date-of-birth', val)
    })

    const modelPrice = computed({
      get: () => props.price,
      set: (val) => emit('update:price', val)
    })

    return {
      modelFirstName,
      modelLastName,
      modelSurname,
      modelDateOfBirth,
      modelPrice
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.registration-doctor {
  &__name, &__birth-price {
    display: flex;
    gap: 10px;

    @media screen and (max-width: $md4 + px) {
      flex-direction: column;
    }
  }

  &__firstName, &__lastName, &__surname {
    flex: 0 1 33.333%;

    @media screen and (max-width: $md4 + px) {
      flex-basis: 100%;
    }
  }

  &__birth {
    input {
      padding: 11px;
    }
  }

  &__birth, &__price {
    flex: 0 1 50%;

    @media screen and (max-width: $md4 + px) {
      flex-basis: 100%;
    }
  }
}
</style>
