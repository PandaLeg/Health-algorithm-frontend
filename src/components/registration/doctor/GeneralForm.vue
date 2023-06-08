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
      <div class="input-error">
        {{ firstNameErrors[0] }}
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
      <div class="input-error">
        {{ lastNameErrors[0] }}
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
      <div class="input-error">
        {{ surnameErrors[0] }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "RegistrationDoctorForm",
  props: {
    v$: {required: true},
    firstName: {required: true,},
    lastName: {required: true,},
    surname: {required: true,},
    firstNameErrors: {required: true},
    lastNameErrors: {required: true},
    surnameErrors: {required: true}
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
    modelSurname: {
      get() {
        return this.surname
      },

      set(value) {
        this.$emit('update:surname', value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.registration-doctor {
  &__name {
    display: flex;
    gap: 10px;

    @media screen and (max-width: $md4 + px) {
      flex-direction: column;
    }
  }

  &__firstName, &__lastName, &__surname {
    flex: 1 1 33.333%;

    @media screen and (max-width: $md4 + px) {
      flex-basis: 100%;
    }
  }
}
</style>
