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
                placeholder="Enter experience"
                type="number"
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
        <VSelect
            v-model="modelCategory"
            :options="categories"
        />
        <div class="input-error">
            {{ categoryIdErrors[0] }}
        </div>
    </div>
    <div
            class="registration-doctor__specialties"
            :class="{'form-error': v$.doctor.specialties.$error}"
            v-if="specialtiesFromDb.length"
    >
        <label>Specialties *</label>
        <VAutocomplete
            v-model="modelSpecialties"
            :items="specialtiesFromDb"
            item-title="name"
            item-value="id"
            label="Select the specialty"
            multiple
        />
        <div class="input-error">
            {{ specialtyErrors[0] }}
        </div>
    </div>
</template>

<script>
import VSelect from "../custom/VSelect.vue";
import VAutocomplete from "../custom/VAutocomplete.vue";

export default {
    name: "RegistrationDoctorForm",
    components: {
        VSelect,
        VAutocomplete
    },
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
        surname: {
            required: true,
        },
        experience: {
            required: true,
        },
        categoryId: {
            required: true,
        },
        categories: {
            required: true,
        },
        specialties: {
            required: true
        },
        specialtiesFromDb: {
            required: true
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
        },
        specialtyErrors: {
            required: true
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
        },
        modelSpecialties: {
            get() {
                return this.specialties
            },

            set(value) {
                this.$emit('update:specialties', value)
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
