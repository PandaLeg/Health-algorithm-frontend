<template>
  <div class="clinic">
    <div class="container">
      <ClinicList
          :clinics="clinics"
      />
      <VPagination
          v-if="clinics.length > 0"
          :current-page="page"
          :total-pages="totalPages"
          @next-page="nextPage"
      />
    </div>
  </div>
</template>

<script>
import ClinicList from "../../components/clinic/ClinicList.vue";
import regMountedStateHook from "../../hooks/reg-mounted-state.hook";
import initStateHook from "../../hooks/clinic/init-state.hook";
import getClinicsHook from "../../hooks/clinic/get-clinics.hook";
import VPagination from "../../components/custom/VPagination.vue";

export default {
  name: "ClinicPage",
  components: {
    VPagination,
    ClinicList
  },
  setup() {
    regMountedStateHook()

    const {clinics, page, perPage, totalPages} = initStateHook()
    const {nextPage} = getClinicsHook(clinics, page, perPage, totalPages)

    return {
      clinics,
      page,
      totalPages,
      nextPage
    }
  }
}
</script>

<style scoped lang="scss">
.clinic {
  height: 100%;
}
</style>
