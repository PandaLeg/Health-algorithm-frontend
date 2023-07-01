<template>
  <div class="registration-clinic">
    <div class="container">
      <div class="registration-clinic__body">
        <h1 class="registration-clinic__title">Registration Clinic</h1>
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
            @registration="registrationUser"
        >
          <registration-clinic-form
              :name-errors="nameErrors"
              v-model:name="user.clinic.name"
              :v$="v$"
          >
            <validate-each
                v-for="(item, index) in locations"
                :key="index"
                :state="item"
                :rules="locationRule"
            >
              <template #default="{ v }">
                <location-item
                    :item="item"
                    :index="index"
                    :v="v"
                    v-model:location-vuelidate="locationVuelidate"
                />
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
          </registration-clinic-form>
        </registration-user-form>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationUserForm from "../../components/registration/RegistrationUserForm.vue";
import RegistrationClinicForm from "../../components/registration/clinic/RegistrationClinicForm.vue";
import initUserStateAndRules from "../../hooks/registration/initUserStateAndRules";
import {useVuelidate} from "@vuelidate/core";
import computedErrors from "../../hooks/computedErrors";
import regMountedState from "../../hooks/regMountedState";
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
    const {locations, entity, rule, locationRule, locationVuelidate} = initStateRulesHook()
    const {user, rules, image} = initUserStateAndRules(entity, rule);
    const v$ = useVuelidate(rules, user)
    const v = useVuelidate()

    const {
      emailErrors,
      passwordErrors,
      phoneErrors,
      cityErrors,
    } = computedErrors(v$)
    const {nameErrors, isValid, isValidLocation} = computedClinicErrorsHook(v$, locationVuelidate)

    const {addLocation, deleteLocation} = manageLocationHook(locations, locationVuelidate)

    const type = 'clinic'

    const {registrationUser} = registration(v$, user, isValid, type, image, locations, isValidLocation)

    regMountedState()

    return {
      v$,
      v,
      user,
      locationRule,
      locations,
      locationVuelidate,
      emailErrors, passwordErrors, phoneErrors, cityErrors, nameErrors,
      addLocation,
      deleteLocation,
      registrationUser
    }
  }
}
</script>

<style scoped lang="scss">
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

</style>
