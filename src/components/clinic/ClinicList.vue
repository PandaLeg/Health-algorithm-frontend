<template>
  <div
      v-if="clinics.length > 0"
      class="clinic__list clinic-list"
  >
    <div
        v-for="clinic in clinics"
        :key="clinic.userId"
        class="clinic-list__card clinic-card"
    >
      <slot
          name="listItem"
          :clinic="clinic"
          :pathToImg="pathToImg"
      >
      </slot>
    </div>
  </div>
  <div
      v-else
      class="clinic__list not-found"
  >
    <span>Not found</span>
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

<style lang="scss" scoped>

</style>
