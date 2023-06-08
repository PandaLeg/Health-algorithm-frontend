<template>
  <div class="registration-doctor">
    <div class="container">
      <div class="registration-doctor__body">
        <registration-stepper
            :is-specialty-success="step.isSpecialtySuccess"
            :is-specialty-active="step.isSpecialtyActive"
            :is-general-success="step.isGeneralSuccess"
            :is-general-active="step.isGeneralActive"
        />
        <div
            v-if="step.isGeneralActive"
            class="registration-doctor__content"
        >
          <h1 class="registration-doctor__title">General</h1>
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
            <general-form
                :v$="v$"
                :surname-errors="surnameErrors"
                :last-name-errors="lastNameErrors"
                :first-name-errors="firstNameErrors"
                v-model:surname=user.doctor.surname
                v-model:last-name="user.doctor.lastName"
                v-model:first-name="user.doctor.firstName"
            />
            <template v-slot:continue>
              <div class="registration__button" @click="nextStep">
                <button>Continue</button>
              </div>
            </template>
          </registration-user-form>
        </div>
        <div
            v-else-if="step.isSpecialtyActive"
            class="registration-doctor__content"
        >
          <h1 class="registration-doctor__title">Specialty</h1>
          <specialty-form
              :specialty-errors="specialtiesErrors"
              :category-id-errors="categoryIdErrors"
              :experience-errors="experienceErrors"
              :about-errors="aboutErrors"
              :education-errors="educationErrors"
              :specialties-from-db="specialtiesFromDb"
              :categories="categories"
              v-model:specialties="user.doctor.specialties"
              v-model:category-id="user.doctor.categoryId"
              v-model:experience="user.doctor.experience"
              v-model:about="user.doctor.description.about"
              v-model:education="user.doctor.description.education"
              v-model:course="user.doctor.description.course"
              :v$="v$"
              @next-step="nextStep"
          />
        </div>
        <div
            v-else
            class="registration-doctor__content"
        >
          <h1 class="registration-doctor__title">Work place</h1>

          <form @submit.prevent class="registration-doctor__place-form">
            <div
                v-for="item in contentFields"
                :key="`k${item.id}`"
                class="registration-doctor__place"
            >
              <work-place-item
                  v-model:places="user.doctor.places"
                  :item="item"
                  :v$="v$"
                  :places-errors="placesErrors"
              />
              <div
                  v-if="item.id !== 1"
                  class="registration-doctor__del"
              >
                <button @click="deletePlace(item)">Delete place</button>
              </div>
            </div>
            <div class="registration-doctor__add">
              <button @click="addPlace">Add place of work</button>
            </div>
          </form>

          <div class="registration__button">
            <button @click="registrationUser">Registration</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationUserForm from "../../components/registration/RegistrationUserForm.vue";
import GeneralForm from "../../components/registration/doctor/GeneralForm.vue";
import SpecialtyForm from "../../components/registration/doctor/SpecialtyForm.vue";
import WorkPlaceItem from "../../components/registration/doctor/WorkPlaceItem.vue";
import RegistrationStepper from "../../components/registration/doctor/RegistrationStepper.vue";
import initUserStateAndRules from "../../hooks/registration/initUserStateAndRules";
import {useVuelidate} from "@vuelidate/core";
import computedErrors from "../../hooks/computedErrors";
import computedDoctorErrors from "../../hooks/registration/doctor/computedDoctorErrors";
import registration from "../../hooks/registration/registration";
import initStateAndRules from "../../hooks/registration/doctor/init-state-rules.hook";
import regMountedState from "../../hooks/regMountedState";
import nextStepHook from "../../hooks/registration/doctor/next-step.hook";
import managePlaceHook from "../../hooks/registration/doctor/manage-place.hook";

export default {
  name: "RegistrationDoctorPage",
  components: {
    RegistrationStepper,
    RegistrationUserForm,
    GeneralForm,
    SpecialtyForm,
    WorkPlaceItem
  },
  setup() {
    regMountedState()

    const {
      entity,
      specialtiesFromDb,
      categories,
      rule,
      step,
      citiesFromDb,
      contentFields,
      clinicsFromDb,
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
      aboutErrors,
      educationErrors,
      placesErrors,
      isValidGeneral,
      isValidSpecialty,
      isValid
    } = computedDoctorErrors(v$)

    const type = 'doctor'

    const {registrationUser} = registration(v$, user, isValid, type, image)
    const {nextStep} = nextStepHook(v$, step, isValidGeneral, isValidSpecialty)
    const {addPlace, deletePlace} = managePlaceHook(contentFields, user)

    return {
      user,
      v$,
      image,
      categories,
      specialtiesFromDb,
      citiesFromDb,
      clinicsFromDb,
      contentFields,
      step,
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
      aboutErrors,
      educationErrors,
      placesErrors,
      registrationUser,
      nextStep,
      addPlace,
      deletePlace,
    }
  },
}
</script>

<style lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";

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

  &__place-form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  &__place {
    display: flex;
    flex-direction: column;
  }

  &__add, &__del {
    text-align: center;
    padding: 1px 0;

    button {
      position: relative;
      z-index: 1;
      border: none;
      border-radius: 5px;
      background: $grayLighten2;
      font-size: 16px;
      width: 50%;
      padding: 12px 30px;

      &::after {
        @extend %after-effect-btn;
      }

      &:hover::after {
        opacity: 1;
      }
    }

    @media screen and (max-width: $md4 + px) {
      button {
        width: 100%;
      }
    }
  }

  &__del {
    margin-bottom: 20px;
  }
}

.input-error {
  @extend %input-error;
}

.form-error {
  input, select {
    @extend %form-error;
  }
}

input {
  @extend %field-reg;
}

label {
  @extend %label-reg;
}
</style>
