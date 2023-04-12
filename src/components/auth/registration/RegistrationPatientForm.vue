<template>
  <v-card-title>
      Registration Patient
  </v-card-title>
  <form @submit.prevent class="registration__form">
      <v-text-field
              v-model="firstName"
              color="primary"
              label="First Name"
              clearable
              required
      />
      <v-text-field
              v-model="lastName"
              color="primary"
              label="Last Name"
              clearable
              required
      />
      <v-text-field
              v-model="phone"
              color="primary"
              label="Phone"
              clearable
              required
      />
      <v-text-field
              v-model="email"
              color="primary"
              label="Email"
              clearable
              required
      />
      <v-text-field
              v-model="password"
              color="primary"
              label="Password"
              clearable
              required
      />
      <v-text-field
              v-model="city"
              color="primary"
              label="City"
              clearable
              required
      />
  </form>
  <v-card-actions class="justify-end">
      <v-btn
              color="green"
              outlined
              @click=""
      >
          Sign Up
      </v-btn>
  </v-card-actions>
</template>

<script>
export default {
    name: "RegistrationPatientForm",
    data() {
        return {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            city: ''
        }
    }
}
</script>

<style scoped>

</style>
