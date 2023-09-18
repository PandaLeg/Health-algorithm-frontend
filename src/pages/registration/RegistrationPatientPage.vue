<template>
  <div class="registration-patient">
    <div class="container">
      <div class="registration-patient__body">
        <h1 class="registration-patient__title">Registration Patient</h1>
        <registration-user-form
            :v$="v$"
            v-model:password="user.password"
            v-model:email="user.email"
            v-model:phone="user.phone"
            v-model:image="image"
        >
          <registration-patient-form
              :v$="v$"
              v-model:first-name="user.patient.firstName"
              v-model:last-name="user.patient.lastName"
              v-model:city="user.patient.city"
              v-model:search-city="searchCity"
              v-model:searched-cities="searchedCities"
          />
          <div class="registration__button">
            <button @click="registrationUser">Registration</button>
          </div>
        </registration-user-form>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationUserForm from "../../components/registration/RegistrationUserForm.vue";
import RegistrationPatientForm from "../../components/registration/RegistrationPatientForm.vue";
import initUserStateAndRules from "../../hooks/registration/init-user-state-rules.hook";
import {useVuelidate} from "@vuelidate/core";
import registration from "../../hooks/registration/registration";
import computedPatientErrors from "../../hooks/registration/patient/computed-patient-errors.hook";
import initStateAndRules from "../../hooks/registration/patient/init-state-rules.hook";
import regMountedState from "../../hooks/reg-mounted-state.hook";

export default {
  name: "RegistrationPatientPage",
  components: {
    RegistrationUserForm,
    RegistrationPatientForm
  },
  setup() {
    const {entity, rule, searchCity, searchedCities} = initStateAndRules();
    const {user, rules, image} = initUserStateAndRules(entity, rule);
    const v$ = useVuelidate(rules, user)

    const {isValid} = computedPatientErrors(v$)

    const type = 'patient'
    const {registrationUser} = registration(v$, user, isValid, type)

    regMountedState()

    return {
      v$,
      user,
      image,
      searchCity,
      searchedCities,
      registrationUser
    }
  },
}
</script>

<style lang="scss">
@import "src/assets/scss/variables";

.registration-patient {
  height: 100%;
  padding: 40px 0;

  &__body {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: $white;
    border-radius: 10px;
  }

  &__title {
    font-size: 24px;
    margin-bottom: 20px;
    color: $darkBlue;
    text-align: center;
  }
}
</style>
