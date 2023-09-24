<template>
  <div class="registration-clinic">
    <div class="container">
      <div class="registration-clinic__body">
        <h1 class="registration-clinic__title">Registration Clinic</h1>
        <registration-user-form
            :v$="v$"
            v-model:password="user.password"
            v-model:email="user.email"
            v-model:phone="user.phone"
            v-model:image="image"
        >
          <registration-clinic-form
              v-model:name="user.clinic.name"
              v-model:description="user.clinic.description"
              v-model:clinic-type="user.clinic.clinicType"
              :v$="v$"
              :clinic-types="clinicTypes"
          >
            <validate-each
                v-for="item in locations"
                :key="item.id"
                :state="item"
                :rules="locationRule"
            >
              <template #default="{ v }">
                <location-item
                    v-model:search-city="item.searchCity"
                    v-model:searched-cities="item.searchedCities"
                    v-model:city="v.city.$model"
                    v-model:address="v.address.$model"
                    v-model:conveniences="v.conveniences.$model"
                    v-model:schedule="item.schedule"
                    v-model:location-vuelidate="locationVuelidate"
                    :v-location="v"
                    :schedule-rule="scheduleRule"
                    :convenience-items="item.convenienceItems"
                    :days="item.days"
                    :index-location="item.id"
                ></location-item>
                <div
                    v-if="item.id !== 1"
                    class="registration-clinic__del"
                >
                  <button @click="deleteLocation(item)">Delete location</button>
                </div>
              </template>
            </validate-each>
            <div class="registration-clinic__add">
              <button @click="addLocation">Add location</button>
            </div>
            <div class="registration__button">
              <button @click="registrationUser">Registration</button>
            </div>
          </registration-clinic-form>
        </registration-user-form>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationUserForm from "../../components/registration/RegistrationUserForm.vue";
import RegistrationClinicForm from "../../components/registration/clinic/RegistrationClinicForm.vue";
import initUserStateAndRules from "../../hooks/registration/init-user-state-rules.hook";
import {useVuelidate} from "@vuelidate/core";
import regMountedState from "../../hooks/reg-mounted-state.hook";
import initStateRulesHook from "../../hooks/registration/clinic/init-state-rules.hook";
import computedClinicErrorsHook from "../../hooks/registration/clinic/computed-clinic-errors.hook";
import LocationItem from "../../components/registration/clinic/LocationItem.vue";
import manageLocationHook from "../../hooks/registration/clinic/manage-location.hook";
import registration from "../../hooks/registration/registration";
import {ValidateEach} from "@vuelidate/components";

export default {
  name: "RegistrationClinicPage",
  components: {
    LocationItem,
    RegistrationUserForm,
    RegistrationClinicForm,
    ValidateEach
  },
  setup() {
    const {
      locations,
      entity,
      rule,
      weekDays,
      clinicTypes,
      conveniencesFromDb,
      locationRule,
      locationVuelidate,
      scheduleRule
    } = initStateRulesHook()
    const {user, rules, image} = initUserStateAndRules(entity, rule);
    const v$ = useVuelidate(rules, user)

    const {isValid, isValidLocation} = computedClinicErrorsHook(v$, locationVuelidate)

    const {addLocation, deleteLocation} = manageLocationHook(locations, locationVuelidate, weekDays, conveniencesFromDb)

    const type = 'clinic'

    const {registrationUser} = registration(v$, user, isValid, type, image, locations, isValidLocation)

    regMountedState()

    return {
      v$,
      user,
      image,
      clinicTypes,
      locationRule,
      locations,
      locationVuelidate,
      scheduleRule,
      addLocation,
      deleteLocation,
      registrationUser
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";

.registration-clinic {
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

  &__add {
    margin-top: 5px;
  }
}

.input-error {
  @extend %input-error;
}

.form-error {
  input, textarea, select {
    @extend %form-error;
  }
}

input, textarea {
  @extend %field-reg;
}

label {
  @extend %label-reg;
}

</style>
