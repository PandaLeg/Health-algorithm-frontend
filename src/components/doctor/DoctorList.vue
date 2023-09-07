<template>
  <div
      v-if="doctors.length && !isLoading"
      class="doctor__list doctor-list"
  >
    <div
        v-for="doctor in doctors"
        :key="doctor.userId"
        class="doctor-list__card doctor-card"
    >
      <DoctorListItem
          :doctor="doctor"
          :path-to-img="pathToImg"
          :slots-days="slotsDays"
          :visit-times="visitTimes"
      />
    </div>
  </div>
  <div
      v-else-if="!doctors.length && isLoading"
      class="doctor__list doctor-list"
  >
    <div
        v-for="item in perPage"
        :key="`k-${item}`"
        class="doctor-list__card doctor-card"
    >
      <DoctorListItem
          :doctor="staticDoctorInfo"
          :path-to-img="pathToImg"
          :slots-days="slotsDays"
          :visit-times="visitTimes"
          :is-loading="isLoading"
      />
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
import {computed, defineComponent} from 'vue'
import DoctorListItem from "./DoctorListItem.vue";
import {config} from "../../util/config";

export default defineComponent({
  name: "DoctorList",
  components: {
    DoctorListItem,
  },
  props: {
    doctors: {
      default: () => []
    },
    perPage: {
      required: true
    },
    isLoading: {
      required: true
    },
    staticDoctorInfo: {
      required: true
    },
    slotsDays: {
      required: true
    },
    visitTimes: {
      required: true
    },
  },
  setup() {
    const pathToImg = computed(() => config.apiUrl + '/')

    return {
      pathToImg
    }
  }
})
</script>

<style lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/doctor-card";

.doctor-list {
  padding-top: 30px;

  &__card {
    margin: 0 20px 20px;
  }
}

.doctor-card {
  &__wrapper {
    display: flex;

    @media screen and (max-width: $md2 + px) {
      flex-direction: column;
    }
  }

  &__block {
    flex: 1;
    padding-top: 20px;
    position: relative;

    &:first-child {
      flex: 1 1;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: #ebeff6;
      }

      @media screen and (max-width: $md2 + px) {
        flex: 1;

        &::after {
          display: none;
        }
      }
    }

    &.skeleton:first-child {
      height: 298px;
    }

    &:last-child {
      flex: 1 0 350px;
      max-width: 350px;

      @media screen and (max-width: $md2 + px) {
        flex: 1;
        max-width: none;
        padding-top: 10px;
      }
    }
  }

  &__content {
    display: flex;
    margin-bottom: 15px;

    @media screen and (max-width: $md4 + px) {
      flex-direction: column;
      padding: 0 15px;
    }
  }

  &__avatar {
    &.skeleton {
      background-color: rgba(0, 0, 0, 0.12);

      img {
        visibility: hidden;
      }
    }
  }


  &__full-name {
    &.skeleton {
      height: 24px;
    }
  }

  &__specialties, &__category {
    &.skeleton {
      height: 14px;

      @media screen and (max-width: $md4 + px) {
        height: 13px;
      }
    }
  }

  &__description {
    &.skeleton {
      height: 80px;
      max-height: 80px;
      text-overflow: ellipsis;
    }

    @media screen and (max-width: $md4 + px) {
      &.skeleton {
        display: none;
      }
    }
  }

  &__price {
    &.skeleton {
      height: 14px;

      span {
        visibility: hidden;
      }
    }
  }
}


.experience {
  @media screen and (max-width: $md4 + px) {
    &.skeleton {
      justify-content: center;
      margin-bottom: 10px;
    }
  }

  &.skeleton {
    height: 20px;
    background-color: inherit;

    .experience__text {
      visibility: hidden;
    }
  }
}

.specialties {
  &__list {
    &.skeleton {
      height: 14px;

      @media screen and (max-width: $md4 + px) {
        height: 13px;
      }
    }
  }
}

.doctor-slots {
  display: flex;
  flex-direction: column;
  padding: 0 19px 20px;

  &__title {
    font-weight: 700;
    text-align: center;
    font-size: 13px;

    &.skeleton {
      height: 13px;

      span {
        visibility: hidden;
      }
    }
  }

  &__select-time {
    margin: 20px 0 15px;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;

    &.skeleton {
      height: 32px;

      span {
        visibility: hidden;
      }
    }
  }

  &__days {
    &.skeleton {
      height: 42px;

      span {
        visibility: hidden;
      }
    }
  }

  &__list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: $md2 + px) {
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 0 0 10px;
    }

    &.skeleton {
      height: 80px;

      span {
        visibility: hidden;
      }

      @media screen and (max-width: $md4 + px) {
        height: 50px;
      }
    }
  }
}

.slots-days {
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #ebeff6;
  border-radius: 8px;

  &__item {
    flex: 1 0 33.333%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    cursor: pointer;
    text-align: center;
    position: relative;

    &:not(&:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      width: 1px;
      height: 20px;
      background-color: #ebeff6;
    }
  }

  &__week-day {
    margin-right: 3px;
    font-weight: 700;
  }

  &__day {
  }
}

.visit-time {
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1 0 70px;
    height: 32px;
    max-width: 70px;
    margin: 4px;
    padding: 0 10px;
    background-color: #ebf6f3;
    color: #0fb4a8;
    font-weight: 500;
    font-size: 13px;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #1fbeb2;
      color: #fff;
    }
  }
}

.skeleton {
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 6px;
}

</style>
