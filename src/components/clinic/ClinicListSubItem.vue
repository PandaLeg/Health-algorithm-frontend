<template>
  <div class="clinic-card__wrapper">
    <div class="clinic-card__content">
      <div class="clinic-card__inner clinic-card__inner_padding">
        <div class="clinic-card__type">
          <span>
            {{ clinic.type }}
          </span>
        </div>
        <div class="clinic-card__conveniences clinic-conveniences">
          <div
              v-for="convenience in clinic.conveniences"
              :key="convenience.id"
              class="clinic-conveniences__item"
          >
            <i
                class="clinic-conveniences__icon"
                :class="getIcon(convenience.id)">
            </i>
            <span>{{ convenience.name }}</span>
          </div>
        </div>
        <div class="clinic-card__schedule clinic-schedule">
          <div
              v-for="schedule in clinic.schedule"
              :key="schedule.id"
              class="clinic-schedule__item"
          >
            <span>{{ schedule.date }};</span>
          </div>
        </div>
        <div class="clinic-card__address">
          <span>{{ clinic.address }}</span>
        </div>
        <div class="clinic-card__look card-look">
          <router-link
              :to="{
              name: routesNames.clinic.name,
              params: { id: clinic.clinicBranchId },
              query: { city: clinic.city, clinic: clinic.clinicId }
              }"
              class="btn btn_a"
          >
            <span class="btn__content">Look</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routes from "../../router/routes-names";
import {getClinicConvenienceIcons} from "../../util/get-icons";
import {computed} from "vue";

export default {
  name: "SubClinicListItem",
  props: {
    clinic: {
      type: Object,
      required: true
    }
  },
  setup() {
    const getIcon = (convenienceId) => getClinicConvenienceIcons(convenienceId)
    const routesNames = computed(() => routes)

    return {
      routesNames,
      getIcon
    }
  }
}
</script>


<style scoped lang="scss">

</style>
