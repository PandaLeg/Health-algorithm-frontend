<template>
    <div class="registration">
        <div class="container">
            <div class="registration__body">
                <router-link
                        :to="{name: routesNames.registrationPatient.name}"
                        class="registration__link"
                >
                    <h1>Patient</h1>
                </router-link>
                <router-link
                        :to="{name: routesNames.registrationDoctor.name}"
                        class="registration__link"
                >
                    <h1>Doctor</h1>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import routesNames from "../../router/routesNames";

export default {
    name: "RegistrationPage",
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
