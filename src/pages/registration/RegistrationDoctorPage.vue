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
                        @registration="registrationUser"
                >
                    <registration-doctor-form
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
                </registration-user-form>
            </div>
        </div>
    </div>
</template>

<script>
import RegistrationUserForm from "../../components/registration/RegistrationUserForm.vue";
import RegistrationDoctorForm from "../../components/registration/RegistrationDoctorForm.vue";
import initUserStateAndRules from "../../hooks/registration/initUserStateAndRules";
import {useVuelidate} from "@vuelidate/core";
import computedErrors from "../../hooks/computedErrors";
import computedDoctorErrors from "../../hooks/registration/doctor/computedDoctorErrors";
import registration from "../../hooks/registration/registration";
import initStateAndRules from "../../hooks/registration/doctor/initStateAndRules";

export default {
    name: "RegistrationDoctorPage",
    components: {
        RegistrationUserForm,
        RegistrationDoctorForm
    },
    setup() {
        const {entity, specialtiesFromDb, categories, rule} = initStateAndRules()
        const {user, rules} = initUserStateAndRules(entity, rule);

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
        const {registrationUser} = registration(v$, user, isValid, type)

        return {
            user, v$, categories, specialtiesFromDb,
            emailErrors, passwordErrors, phoneErrors, cityErrors,
            firstNameErrors, lastNameErrors, surnameErrors, experienceErrors, categoryIdErrors, specialtiesErrors,
            registrationUser
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.registration-doctor {
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
