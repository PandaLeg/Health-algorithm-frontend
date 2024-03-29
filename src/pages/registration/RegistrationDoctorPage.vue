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
              v-model:password="user.password"
              v-model:email="user.email"
              v-model:phone="user.phone"
              v-model:image="image"
          >
            <general-form
                :v$="v$"
                v-model:surname=user.doctor.surname
                v-model:last-name="user.doctor.lastName"
                v-model:first-name="user.doctor.firstName"
                v-model:date-of-birth="user.doctor.dateOfBirth"
                v-model:price="user.doctor.price"
            ></general-form>
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
          <div class="registration-doctor__back">
            <button @click="backStep">
              <arrow-left-s-v-g/>
              <span>Back</span>
            </button>
          </div>
          <h1 class="registration-doctor__title">Specialty</h1>
          <specialty-form
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
          ></specialty-form>
        </div>
        <div
            v-else
            class="registration-doctor__content"
        >
          <div class="registration-doctor__back">
            <button @click="backStep">
              <arrow-left-s-v-g/>
              <span>Back</span>
            </button>
          </div>
          <h1 class="registration-doctor__title">Work place</h1>

          <form @submit.prevent class="registration-doctor__place-form">
            <work-place-item
                v-model:city="workPlace.city"
                v-model:clinic-name="workPlace.clinicName"
                v-model:address="workPlace.address"
                v-model:search-city="workPlace.searchCity"
                v-model:search-clinic="workPlace.searchClinic"
                v-model:searched-cities="workPlace.searchedCities"
                v-model:searched-clinics="workPlace.searchedClinics"
                v-model:clinic-branches="workPlace.clinicBranches"
                v-model:addresses="workPlace.addresses"
                v-model:schedule="workPlace.schedule"
                v-model:days="workPlace.days"
                v-model:location-vuelidate="workPlaceVuelidate"
                v-model:schedule-rule="scheduleRule"
                :v="vPlace"
            ></work-place-item>

            <div class="registration__button">
              <button @click="registrationUser">Registration</button>
            </div>
          </form>
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
import initUserStateAndRules from "../../hooks/registration/init-user-state-rules.hook";
import {useVuelidate} from "@vuelidate/core";
import computedDoctorErrorsHook from "../../hooks/registration/doctor/computed-doctor-errors.hook";
import registration from "../../hooks/registration/registration";
import initStateAndRules from "../../hooks/registration/doctor/init-state-rules.hook";
import regMountedState from "../../hooks/reg-mounted-state.hook";
import makeStep from "../../hooks/registration/doctor/make-step.hook";
import LocationItem from "../../components/registration/clinic/LocationItem.vue";
import SearchClinic from "../../components/clinic/SearchClinic.vue";
import ArrowLeftSVG from "../../components/svg/ArrowLeftSVG.vue";

export default {
  name: "RegistrationDoctorPage",
  components: {
    ArrowLeftSVG,
    SearchClinic,
    LocationItem,
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
      workPlaceRule,
      step,
      workPlace,
      workPlaceVuelidate,
      scheduleRule,
    } = initStateAndRules()
    const {user, rules, image} = initUserStateAndRules(entity, rule);

    const v$ = useVuelidate(rules, user)
    const vPlace = useVuelidate(workPlaceRule, workPlace)

    const {
      isValidGeneral,
      isValidSpecialty,
      isValid,
      isValidLocation
    } = computedDoctorErrorsHook(v$, vPlace, workPlaceVuelidate)

    const type = 'doctor'

    const {registrationUser} = registration(v$, user, isValid, type, image, workPlace, isValidLocation)
    const {nextStep, backStep} = makeStep(v$, step, isValidGeneral, isValidSpecialty)

    return {
      user,
      v$,
      image,
      categories,
      specialtiesFromDb,
      workPlace,
      vPlace,
      workPlaceVuelidate,
      step,
      scheduleRule,
      registrationUser,
      nextStep,
      backStep
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

  &__del, &__add {
    margin-bottom: 20px;
  }

  &__back {
    margin-bottom: 5px;
    padding: 1px 0;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1;
      border: none;
      border-radius: 5px;
      background: $grayLighten2;
      padding: 4px 20px;

      &::after {
        @extend %after-effect-btn;
      }

      &:hover::after {
        opacity: 1;
      }
    }
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
