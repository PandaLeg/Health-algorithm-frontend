<template>
  <div
      v-if="doctors.length"
      class="doctor__sub-list doctor-list"
  >
    <div
        v-for="doctor in doctors"
        :key="doctor.userId"
        class="doctor-list__card doctor-card"
    >
      <DoctorSubListItem :doctor="doctor"/>
    </div>
  </div>
  <div
      v-else
      class="doctor__list not-found"
  >
    <span>Not found</span>
  </div>
</template>

<script>
import DoctorSubListItem from "./DoctorSubListItem.vue";

export default {
  name: "DoctorSubList",
  components: {DoctorSubListItem},
  props: {
    doctors: {
      default: () => []
    },
  }
}
</script>


<style lang="scss">

</style>
