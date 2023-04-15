<template>
    <div
            class="registration-doctor__firstName"
            :class="{'form-error': v$.doctor.firstName.$error}"
    >
        <label>First Name *</label>
        <input
                v-model="modelFirstName"
                placeholder="Enter first name"
                required
                @input="v$.doctor.firstName.$touch"
                @blur="v$.doctor.firstName.$touch"
        />
        <div class="input-error">
            {{ firstNameErrors[0] }}
        </div>
    </div>
    <div
            class="registration-doctor__lastName"
            :class="{'form-error': v$.doctor.lastName.$error}"
    >
        <label>Last Name *</label>
        <input
                v-model="modelLastName"
                placeholder="Enter last name"
                required
                @input="v$.doctor.lastName.$touch"
                @blur="v$.doctor.lastName.$touch"
        />
        <div class="input-error">
            {{ lastNameErrors[0] }}
        </div>
    </div>
    <div
            class="registration-doctor__surname"
            :class="{'form-error': v$.doctor.surname.$error}"
    >
        <label>Surname *</label>
        <input
                v-model="modelSurname"
                placeholder="Enter surname"
                required
                @input="v$.doctor.surname.$touch"
                @blur="v$.doctor.surname.$touch"
        />
        <div class="input-error">
            {{ surnameErrors[0] }}
        </div>
    </div>
    <div
            class="registration-doctor__experience"
            :class="{'form-error': v$.doctor.experience.$error}"
    >
        <label>Experience *</label>
        <input
                v-model="modelExperience"
                id="experience"
                placeholder="Enter experience"
                required
                @input="v$.doctor.experience.$touch"
                @blur="v$.doctor.experience.$touch"
        />
        <div class="input-error">
            {{ experienceErrors[0] }}
        </div>
    </div>
    <div
            class="registration-doctor__category"
            :class="{'form-error': v$.doctor.categoryId.$error}"
    >
        <label>Category *</label>
        <VSelect v-model="modelCategory" :options="[ { id: 1,name: 'SPEC' } ]"/>
        <div class="input-error">
            {{ categoryIdErrors[0] }}
        </div>
    </div>
</template>

<script>
import VSelect from "../../VSelect.vue";

export default {
    name: "RegistrationDoctorForm",
    components: {
        VSelect,
    },
    props: {
        v$: {
            required: true
        },
        firstName: {
            required: true,
            default: null,
            validator: p => typeof p === 'string' || p === null,
        },
        lastName: {
            required: true,
            default: null,
            validator: p => typeof p === 'string' || p === null,
        },
        surname: {
            required: true,
            default: null,
            validator: p => typeof p === 'string' || p === null,
        },
        experience: {
            required: true,
            default: null
        },
        categoryId: {
            required: true,
            default: null,
        },
        firstNameErrors: {
            required: true
        },
        lastNameErrors: {
            required: true
        },
        surnameErrors: {
            required: true
        },
        experienceErrors: {
            required: true
        },
        categoryIdErrors: {
            required: true
        }
    },
    emits: [
        'update:first-name', 'update:last-name', 'update:surname', 'update:experience', 'update:categoryId'
    ],
    data() {
        return {
            options: [
                {
                    id: 1,
                    name: 'SPEC'
                }
            ]
        }
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
        },
        modelSurname: {
            get() {
                return this.surname
            },

            set(value) {
                this.$emit('update:surname', value)
            }
        },
        modelExperience: {
            get() {
                return this.experience
            },

            set(value) {
                this.$emit('update:experience', value)
            }
        },
        modelCategory: {
            get() {
                return this.categoryId
            },

            set(value) {
                this.$emit('update:categoryId', value)
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
