<template>
    <div class="registration-doctor">
        <div class="container">
            <div class="registration-doctor__body">
                <h1 class="registration-doctor__title">Registration Doctor</h1>
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
                        @registration="() => console.log('KEKE')"
                >
                    <registration-doctor-form
                            :v$="v$"
                            :category-id-errors="categoryIdErrors"
                            :experience-errors="experienceErrors"
                            :surname-errors="surnameErrors"
                            :last-name-errors="lastNameErrors"
                            :first-name-errors="firstNameErrors"
                            v-model:category-id="user.doctor.categoryId"
                            v-model:experience="user.doctor.experience"
                            v-model:surname=user.doctor.surname
                            v-model:last-name="user.doctor.lastName"
                            v-model:first-name="user.doctor.firstName"
                    />
                </registration-user-form>
            </div>
        </div>
    </div>
</template>

<script>
import RegistrationUserForm from "../../components/auth/registration/RegistrationUserForm.vue";
import RegistrationDoctorForm from "../../components/auth/registration/RegistrationDoctorForm.vue";
import initStateAndRules from "../../hooks/registration/initStateAndRules";
import {useVuelidate} from "@vuelidate/core";
import computedErrors from "../../hooks/computedErrors";
import initDoctorStateAndRules from "../../hooks/registration/doctor/initDoctorStateAndRules";
import computedDoctorErrors from "../../hooks/registration/doctor/computedDoctorErrors";

export default {
    name: "RegistrationDoctor",
    components: {
        RegistrationUserForm,
        RegistrationDoctorForm
    },
    setup() {
        const {entity, rule} = initDoctorStateAndRules();
        const {user, rules} = initStateAndRules(entity, rule);
        const v$ = useVuelidate(rules, user)

        const {emailErrors, passwordErrors, phoneErrors, cityErrors} = computedErrors(v$)
        const {
            firstNameErrors,
            lastNameErrors,
            surnameErrors,
            experienceErrors,
            categoryIdErrors,
            isValid
        } = computedDoctorErrors(v$)

        return {
            user, v$,
            emailErrors, passwordErrors, phoneErrors, cityErrors,
            firstNameErrors, lastNameErrors, surnameErrors, experienceErrors, categoryIdErrors
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.registration-doctor {
  height: 100%;
  padding: 40px 0 40px 0;
  background: linear-gradient(240deg, $golden, $darkGreen);

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
