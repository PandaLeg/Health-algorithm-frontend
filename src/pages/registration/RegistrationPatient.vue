<template>
    <div class="registration-patient">
        <div class="container">
            <div class="registration-patient__body">
                <h1 class="registration-patient__title">Registration Patient</h1>
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
                    <registration-patient-form
                            :v$="v$"
                            :first-name-errors="firstNameErrors"
                            :last-name-errors="lastNameErrors"
                            v-model:first-name="user.patient.firstName"
                            v-model:last-name="user.patient.lastName"
                    />
                </registration-user-form>
            </div>
        </div>
    </div>
</template>

<script>
import RegistrationUserForm from "../../components/registration/RegistrationUserForm.vue";
import RegistrationPatientForm from "../../components/registration/RegistrationPatientForm.vue";
import initUserStateAndRules from "../../hooks/registration/initUserStateAndRules";
import {useVuelidate} from "@vuelidate/core";
import registration from "../../hooks/registration";
import computedErrors from "../../hooks/computedErrors";
import computedPatientErrors from "../../hooks/registration/patient/computedPatientErrors";
import initStateAndRules from "../../hooks/registration/patient/initStateAndRules";

export default {
    name: "RegistrationPatient",
    components: {
        RegistrationUserForm,
        RegistrationPatientForm
    },
    setup() {
        const {entity, rule} = initStateAndRules();
        const {user, rules} = initUserStateAndRules(entity, rule);
        const v$ = useVuelidate(rules, user)

        const {
            emailErrors,
            passwordErrors,
            phoneErrors,
            cityErrors,
        } = computedErrors(v$)
        const {firstNameErrors, lastNameErrors, isValid} = computedPatientErrors(v$)

        const type = 'patient'
        const {registrationUser} = registration(v$, user, isValid, type)

        return {
            v$,
            user,
            emailErrors, passwordErrors, phoneErrors, cityErrors, firstNameErrors, lastNameErrors,
            registrationUser
        }
    },
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.registration-patient {
  height: 100%;
  padding: 40px 0;
  background: linear-gradient(240deg, $golden, $darkTeal);

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
