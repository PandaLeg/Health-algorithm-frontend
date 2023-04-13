<template>
    <div class="registration">
        <div class="container">
            <router-link
                    :to="{name: routesNames.registrationPatient.name}"
                    class="registration__body"
            >
                <div class="elevation-12">
                    <h1>Patient</h1>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import RegistrationPatientForm from "../../components/auth/registration/RegistrationPatientForm.vue";
import routesNames from "../../router/routesNames";

export default {
    name: "Registration",
    components: {
        RegistrationPatientForm,
    },
    computed: {
        routesNames() {
            return routesNames
        }
    },
}
</script>

<style scoped lang="scss">
.registration {
  padding: 40px 20px;
  overflow: auto;

  &__body {
    display: block;
    max-width: 600px;
    padding: 0 20px;
  }
}
</style>
