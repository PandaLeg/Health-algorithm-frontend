<template>
    <div class="registration">
        <div class="container">
            <v-card class="elevation-12 registration__body">
                <v-window v-model="step">
                    <v-window-item :value="1">
                        <RegistrationPatientForm/>
                    </v-window-item>
                    <v-window-item :value="2">

                    </v-window-item>
                </v-window>
            </v-card>
        </div>
    </div>
</template>

<script>
import RegistrationPatientForm from "../../components/auth/registration/RegistrationPatientForm.vue";

export default {
    name: "Registration",
    components: {
        RegistrationPatientForm
    },
    data() {
        return {
            step: 1
        }
    }
}
</script>

<style scoped lang="scss">
.registration {
  padding: 40px 20px 0;

  &__body {
      max-width: 600px;
      margin: 0 auto;
      padding: 0 20px;
  }
}
</style>
