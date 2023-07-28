<template>
  <div>
    <div class="clinic__list clinic-list">
      <div class="clinic-list__card clinic-card">
        <ClinicListItem :avatar="images.avatar" />
      </div>
    </div>
  </div>
</template>

<script>
import ClinicListItem from "./ClinicListItem.vue";

export default {
  name: "ClinicList",
  components: {
    ClinicListItem
  },
  computed: {
    images() {
      return {
        avatar: require('../.././assets/images/doctor.webp')
      }
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/scss/variables";

.clinic-list {
  padding-top: 30px;

  &__card {
    max-width: 750px;
    margin: 0 auto;
  }
}

.clinic-card {
  box-shadow: 2px 2px 15px rgb(128 142 184 / 10%);
  border-radius: 15px;
  background: $white;

  &__content {
    display: flex;
    margin-bottom: 15px;
    padding-top: 20px;

    @media screen and (max-width: $md4 + px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__avatar {
    flex: 1 0 135px;
    max-width: 135px;
    width: 135px;
    height: 135px;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 10px 15px;
    padding: 6px;
    border: 1px solid $grayLighten2;

    img {
      border-radius: 8px;
      max-width: 100%;
      max-height: 100%;
      height: auto;
      padding: 0;
      object-fit: cover;
    }
  }

  &__inner {
    flex: 1;
    padding-right: 10px;
    margin-bottom: 10px;

    @media screen and (max-width: $md4 + px) {
      text-align: center;
      padding: 0 5px 0;
    }
  }

  &__name {
    margin-bottom: 5px;
    line-height: 24px;
    font-weight: 700;
    font-size: 24px;
  }

  &__type {
    font-weight: 700;
    margin-bottom: 10px;
  }

  &__description {
    margin: 10px 0;
    line-height: 16px;
    color: #707272;
    font-size: 13px;
    max-height: 80px;
    overflow: hidden;
  }
}
</style>
