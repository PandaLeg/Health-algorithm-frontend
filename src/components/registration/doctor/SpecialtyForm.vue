<template>
  <form @submit.prevent class="registration-doctor__specialty-form">
    <div class="registration-doctor__spec-info">
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
        <div
            v-for="error in v$.doctor.experience.$errors"
            :key="error.$uid"
            class="input-error"
        >
          {{ error.$message }}
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
            item-title="name"
            item-value="id"
        />
        <div
            v-for="error in v$.doctor.categoryId.$errors"
            :key="error.$uid"
            class="input-error"
        >
          {{ error.$message }}
        </div>
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
      <div
          v-for="error in v$.doctor.specialties.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
    <div
        class="registration-doctor__about"
        :class="{'form-error': v$.doctor.description.about.$error}"
    >
      <label>Description *</label>
      <textarea
          v-model="modelAbout"
          placeholder="Write about yourself and your activities. For example, I am a cardiologist who deals with such problems as heart treatment, etc."
          required
          @input="v$.doctor.description.about.$touch"
          @blur="v$.doctor.description.about.$touch"
      />
      <div
          v-for="error in v$.doctor.description.about.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
    <div
        class="registration-doctor__education"
        :class="{'form-error': v$.doctor.description.education.$error}"
    >
      <label>Education *</label>
      <textarea
          v-model="modelEducation"
          placeholder="Describe your education. For example: 2018 - 2023 – Kharkiv National University of Radio Electronics. Faculty, «Computer science». Specialty 121, «Software engineering». Master’s degree"
          required
          @input="v$.doctor.description.education.$touch"
          @blur="v$.doctor.description.education.$touch"
      />
      <div
          v-for="error in v$.doctor.description.education.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
    <div class="registration-doctor__course">
      <label>Courses</label>
      <textarea
          v-model="modelCourse"
          placeholder="Describe continuing education courses"
          required
      />
    </div>
    <div class="registration__button" @click="$emit('nextStep')">
      <button>Continue</button>
    </div>
  </form>
</template>

<script>
import VSelect from "../../custom/VSelect.vue";
import VAutocomplete from "../../custom/VAutocomplete.vue";
import {computed} from "vue";

export default {
  name: "RegistrationSpecialtyForm",
  components: {VAutocomplete, VSelect},
  props: {
    v$: {required: true},
    experience: {required: true,},
    categoryId: {required: true,},
    categories: {required: true,},
    specialties: {required: true},
    about: {required: true},
    education: {required: true},
    course: {required: true},
    specialtiesFromDb: {required: true},
  },
  setup(props, {emit}) {
    const modelExperience = computed({
      get: () => props.experience,
      set: (val) => emit('update:experience', val)
    })

    const modelCategory = computed({
      get: () => props.categoryId,
      set: (val) => emit('update:category-id', val)
    })

    const modelSpecialties = computed({
      get: () => props.specialties,
      set: (val) => emit('update:specialties', val)
    })

    const modelAbout = computed({
      get: () => props.about,
      set: (val) => emit('update:about', val)
    })

    const modelEducation = computed({
      get: () => props.education,
      set: (val) => emit('update:education', val)
    })

    const modelCourse = computed({
      get: () => props.course,
      set: (val) => emit('update:course', val)
    })

    return {
      modelExperience,
      modelCategory,
      modelSpecialties,
      modelAbout,
      modelEducation,
      modelCourse
    }
  },
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/ui";

.registration-doctor {
  &__specialty-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__spec-info {
    display: flex;
    gap: 15px;
  }

  &__experience, &__category {
    flex: 1 1 50%;
  }
}

textarea {
  @extend %field-reg;
  min-height: 80px;
}

.form-error {
  textarea {
    @extend %form-error;
  }
}
</style>
