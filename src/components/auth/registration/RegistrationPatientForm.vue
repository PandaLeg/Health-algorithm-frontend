<template>
    <div
            class="registration-patient__firstName"
            :class="{'form-error': v$.patient.firstName.$error}"
    >
        <label>First Name *</label>
        <input
                v-model="modelFirstName"
                placeholder="Enter first name"
                required
                @input="v$.patient.firstName.$touch"
                @blur="v$.patient.firstName.$touch"
        />
        <div class="input-error">
            {{ firstNameErrors[0] }}
        </div>
    </div>
    <div
            class="registration-patient__lastName"
            :class="{'form-error': v$.patient.lastName.$error}"
    >
        <label>Last Name *</label>
        <input
                v-model="modelLastName"
                placeholder="Enter last name"
                required
                @input="v$.patient.lastName.$touch"
                @blur="v$.patient.lastName.$touch"
        />
        <div class="input-error">
            {{ lastNameErrors[0] }}
        </div>
    </div>
</template>

<script>

export default {
    name: "RegistrationPatientForm",
    props: {
        v$: {
            required: true
        },
        firstName: {
            required: true,
        },
        lastName: {
            required: true,
        },
        firstNameErrors: {
            required: true
        },
        lastNameErrors: {
            required: true
        },
    },
    computed: {
        modelFirstName: {
            get() {
                return this.firstName
            },

            set(value) {
                this.$emit('update:first-name', value)
            }
        },
        modelLastName: {
            get() {
                return this.lastName
            },

            set(value) {
                this.$emit('update:last-name', value)
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";

input {
  @extend %fieldReg;
}

label {
  @extend %labelReg;
}

::placeholder {
  color: $darkBlue;
  font-size: 16px;
}
</style>
