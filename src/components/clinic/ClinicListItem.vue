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
            params: { id: clinic.clinicBranchId },
            query: { city: clinic.city, clinic: clinic.clinicId }
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
import routes from "../../router/routes-names";
import {computed} from "vue";

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
  setup() {
    const routesNames = computed(() => routes)
    const defaultAvatar = computed(() => require('../.././assets/images/clinic.webp'))

    return {
      routesNames,
      defaultAvatar
    }
  }
}
</script>

<style scoped lang="scss">

</style>
