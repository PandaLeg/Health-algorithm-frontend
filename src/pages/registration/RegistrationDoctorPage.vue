<template>
  <div class="registration-doctor">
    <div class="container">
      <div class="registration-doctor__body">
        <registration-stepper
            :is-specialty-success="isSpecialtySuccess"
            :is-specialty-active="isSpecialtyActive"
            :is-general-success="isGeneralSuccess"
            :is-general-active="isGeneralActive"
        />
        <div
            v-if="isGeneralActive"
            class="registration-doctor__content"
        >
          <h1 class="registration-doctor__title">General Information</h1>
          <registration-user-form
              :v$="v$"
              :city-errors="cityErrors"
              :password-errors="passwordErrors"
              :email-errors="emailErrors"
              :phone-errors="phoneErrors"
              v-model:city="user.city"
              v-model:password="user.password"
              v-model:email="user.email"
              v-model:phone="user.phone"
              v-model:image="image"
              @registration="registrationUser"
          >
            <registration-general-form
                :v$="v$"
                :category-id-errors="categoryIdErrors"
                :experience-errors="experienceErrors"
                :surname-errors="surnameErrors"
                :last-name-errors="lastNameErrors"
                :first-name-errors="firstNameErrors"
                :specialty-errors="specialtiesErrors"
                :categories="categories"
                :specialties-from-db="specialtiesFromDb"
                v-model:category-id="user.doctor.categoryId"
                v-model:experience="user.doctor.experience"
                v-model:surname=user.doctor.surname
                v-model:last-name="user.doctor.lastName"
                v-model:first-name="user.doctor.firstName"
                v-model:specialties="user.doctor.specialties"
            />
            <template v-slot:continue>
              <div class="registration__button" @click="nextStep">
                <button>Continue</button>
              </div>
            </template>
          </registration-user-form>
        </div>
        <div
            v-else-if="isSpecialtyActive"
            class="registration-doctor__content"
        >
          <h1 class="registration-doctor__title">Specialty Information</h1>
          <registration-specialty-form/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationUserForm from "../../components/registration/RegistrationUserForm.vue";
import RegistrationGeneralForm from "../../components/registration/doctor/RegistrationGeneralForm.vue";
import RegistrationSpecialtyForm from "../../components/registration/doctor/RegistrationSpecialtyForm.vue";
import RegistrationStepper from "../../components/registration/doctor/RegistrationStepper.vue";
import initUserStateAndRules from "../../hooks/registration/initUserStateAndRules";
import {useVuelidate} from "@vuelidate/core";
import computedErrors from "../../hooks/computedErrors";
import computedDoctorErrors from "../../hooks/registration/doctor/computedDoctorErrors";
import registration from "../../hooks/registration/registration";
import initStateAndRules from "../../hooks/registration/doctor/initStateAndRules";
import regMountedState from "../../hooks/regMountedState";

export default {
  name: "RegistrationDoctorPage",
  components: {
    RegistrationStepper,
    RegistrationUserForm,
    RegistrationGeneralForm,
    RegistrationSpecialtyForm
  },
  setup() {
    const {
      entity,
      specialtiesFromDb,
      categories,
      rule,
      isGeneralActive,
      isGeneralSuccess,
      isSpecialtyActive,
      isSpecialtySuccess
    } = initStateAndRules()
    const {user, rules, image} = initUserStateAndRules(entity, rule);

    const v$ = useVuelidate(rules, user)

    const {emailErrors, passwordErrors, phoneErrors, cityErrors} = computedErrors(v$)
    const {
      firstNameErrors,
      lastNameErrors,
      surnameErrors,
      experienceErrors,
      categoryIdErrors,
      specialtiesErrors,
      isValid
    } = computedDoctorErrors(v$)

    const type = 'doctor'
    const {registrationUser} = registration(v$, user, isValid, type, image)

    const nextStep = () => {
      v$.value.$touch()

      if (isGeneralActive.value && isValid()) {
        isSpecialtyActive.value = true
        isGeneralSuccess.value = true
        isGeneralActive.value = !isGeneralActive.value
      }
    }

    regMountedState()

    return {
      user,
      v$,
      image,
      categories,
      specialtiesFromDb,
      isGeneralActive,
      isSpecialtyActive,
      isGeneralSuccess,
      isSpecialtySuccess,
      emailErrors,
      passwordErrors,
      phoneErrors,
      cityErrors,
      firstNameErrors,
      lastNameErrors,
      surnameErrors,
      experienceErrors,
      categoryIdErrors,
      specialtiesErrors,
      registrationUser,
      nextStep
    }
  },
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.registration-doctor {
  height: 100%;
  padding: 40px 0;

  &__body {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: $white;
    border-radius: 10px;
  }

  &__content {
    margin-top: 30px;
  }

  &__title {
    font-size: 24px;
    margin-bottom: 20px;
    color: $darkBlue;
    text-align: center;
  }
}
</style>
