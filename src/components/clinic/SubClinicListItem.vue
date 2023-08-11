<template>
  <div class="clinic-card__wrapper">
    <div class="clinic-card__content">
      <div class="clinic-card__inner clinic-card__inner_padding">
        <div class="clinic-card__type">
          <span>
            {{ clinic.type }}
          </span>
        </div>
        <div class="clinic-card__schedule clinic-schedule">
          <div
              v-for="schedule in clinic.schedule"
              :key="schedule.id"
              class="clinic-schedule__item"
          >
            <span>{{ schedule.addressInfo }};</span>
          </div>
        </div>
        <div class="clinic-card__address">
          <span>{{ clinic.address }}</span>
        </div>
        <div class="clinic-card__make-appointment">
          <button>Look</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routesNames from "../../router/routesNames";

export default {
  name: "SubClinicListItem",
  props: {
    clinic: {
      type: Object,
      required: true
    },
    pathToImg: {
      type: String,
      required: true
    }
  },
  computed: {
    routesNames() {
      return routesNames
    },
    defaultAvatar() {
      return require('../.././assets/images/clinic.webp')
    }
  }
}
</script>


<style scoped lang="scss">

</style>
