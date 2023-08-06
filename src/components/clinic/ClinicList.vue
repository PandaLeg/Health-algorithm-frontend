<template>
  <div>
    <div
        v-if="clinics.length > 0"
        class="clinics__list clinics-list"
    >
      <div
          v-for="clinic in clinics"
          :key="clinic.userId"
          class="clinics-list__card clinic-card"
      >
        <ClinicListItem
            :clinic="clinic"
            :path-to-img="pathToImg"
        />
      </div>
    </div>
    <div
        v-else
        class="clinic__list not-found"
    >
      <span>Not found</span>
    </div>
  </div>
</template>

<script>
import ClinicListItem from "./ClinicListItem.vue";
import {config} from "../../util/config";

export default {
  name: "ClinicList",
  components: {
    ClinicListItem
  },
  props: {
    clinics: {
      default: () => []
    },
  },
  computed: {
    pathToImg() {
      return config.apiUrl + '/'
    },
  }
}
</script>

<style lang="scss">
@import "src/assets/scss/clinic-card";

.clinics-list {
  padding-top: 30px;

  &__card {
    max-width: 750px;
    margin: 0 auto 15px;
  }
}
</style>
