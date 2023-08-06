<template>
  <div class="clinic-card__wrapper">
    <div class="clinic-card__content">
      <div class="clinic-card__avatar">
        <img :src="clinic.avatar ? pathToImg + clinic.avatar : defaultAvatar" alt="Not found">
      </div>
      <div class="clinic-card__inner">
        <div class="clinic-card__name">
          <router-link
              :to="{
            name: routesNames.clinic.name,
            params: { id: clinic.clinicId },
            query: { city: clinic.city, address: clinic.addressId }
          }">
            {{ clinic.name }}
          </router-link>
        </div>
        <div class="clinic-card__type">
          <span>
            {{ clinic.type }}
          </span>
        </div>
        <div class="clinic-card__description">
          <p>
            {{ clinic.description }}
          </p>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import routesNames from "../../router/routesNames";

export default {
  name: "ClinicListItem",
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
