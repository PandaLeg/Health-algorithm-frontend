<template>
  <div class="clinic-card__wrapper">
    <div class="clinic-card__content">
      <div class="clinic-card__avatar">
        <img :src="clinic.avatar ? pathToImg + clinic.avatar : defaultAvatar" alt="Not found">
      </div>
      <div class="clinic-card__inner">
        <div class="clinic-card__name">
                <span>
                  {{ clinic.name }}
                </span>
        </div>
        <div class="clinic-card__type">
                <span>
                  Medical center
                </span>
        </div>
        <div class="clinic-card__description">
          <p>
            {{ clinic.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
    defaultAvatar() {
      return require('../.././assets/images/doctor.webp')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
