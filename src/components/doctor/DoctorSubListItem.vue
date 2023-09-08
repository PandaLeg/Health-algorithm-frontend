<template>
  <div class="doctor-card__inner-content">
    <div class="doctor-card__main">
      <div class="doctor-card__full-name name-lh-fz-18">
        <span>{{ doctor.firstName }} {{ doctor.lastName }}</span>
      </div>
      <div class="doctor-card__specialties specialties-list">
          <span
              v-for="specialty in doctor.specialties"
              :key="specialty.id"
              class="specialties-list__item"
          >
            {{ specialty?.name ?? '' }}
          </span>
      </div>
      <div class="doctor-card__category">
        <span>{{ doctor.categoryName }}</span>
      </div>
    </div>
    <div class="doctor-card__experience experience">
      <span class="experience__number">{{ doctor.experience }}</span>
      <span class="experience__text">experience</span>
    </div>
    <div class="doctor-card__look">
      <button class="btn">
        <span class="btn__content">Look</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DoctorListSubItem",
  props: {
    doctor: {
      type: Object,
      required: true
    }
  },
}
</script>


<style scoped lang="scss">

</style>
