<template>
  <div class="doctor">
    <div class="container">
      <DoctorList
          :doctors="doctors"
          :per-page="perPage"
          :is-loading="isLoading"
          :static-doctor-info="staticDoctorInfo"
          :slots-days="slotsDays"
          :visit-times="visitTimes"
      />
      <VPagination
          v-if="doctors.length > 0"
          :current-page="currentPage"
          :total-pages="totalPages"
          @next-page="nextPage"
      />
    </div>
  </div>
</template>

<script>
import VPagination from "../../components/custom/VPagination.vue";
import initState from "../../hooks/doctor/init-state.hook";
import getDoctors from "../../hooks/doctor/get-doctors.hook";
import DoctorList from "../../components/doctor/DoctorList.vue";
import regMountedState from "../../hooks/reg-mounted-state.hook";

export default {
  name: "DoctorPage",
  components: {
    VPagination,
    DoctorList,
  },
  setup() {
    const {
      currentPage, perPage, totalPages, doctors, isLoading, staticDoctorInfo, slotsDays, visitTimes
    } = initState()

    const {nextPage} = getDoctors(currentPage, perPage, totalPages, doctors, isLoading)
    regMountedState()

    return {
      currentPage,
      totalPages,
      perPage,
      doctors,
      isLoading,
      staticDoctorInfo,
      slotsDays,
      visitTimes,
      nextPage
    }
  }
}
</script>

<style lang="scss">
.doctor {
  height: 100%;
}
</style>
