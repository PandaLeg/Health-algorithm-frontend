<template>
  <div class="clinic">
    <div class="container">
      <ClinicList />
    </div>
  </div>
</template>

<script>
import ClinicList from "../../components/clinic/ClinicList.vue";

export default {
  name: "ClinicPage",
  components: {
    ClinicList
  }
}
</script>

<style scoped lang="scss">
.clinic {
  height: 100%;
}
</style>
