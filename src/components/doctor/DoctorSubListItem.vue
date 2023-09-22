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
      <router-link
          :to="{name: routeNames.doctor.name, params: { id: doctor.userId }}"
          class="btn btn_a"
      >
        <span class="btn__content">Look</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import {computed} from "vue";
import routes from "../../router/routes-names";

export default {
  name: "DoctorListSubItem",
  props: {
    doctor: {
      type: Object,
      required: true
    }
  },
  setup() {
    const routeNames = computed(() => routes)

    return {
      routeNames
    }
  }
}
</script>


<style scoped lang="scss">

</style>
