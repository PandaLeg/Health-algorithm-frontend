<template>
  <div
      v-if="clinics.length"
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
import {computed} from "vue";

export default {
  name: "ClinicList",
  components: {
    ClinicListItem
  },
  props: {
    clinics: {
      type: Array,
      default: () => []
    },
  },
  setup() {
    const pathToImg = computed(() => config.backUrl + '/')

    return {
      pathToImg
    }
  }
}
</script>

<style lang="scss" scoped>
.clinic-list {
  &__card {
    max-width: 750px;
    margin: 0 auto 20px;
  }
}
</style>
