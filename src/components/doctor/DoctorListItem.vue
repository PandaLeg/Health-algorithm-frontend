<template>
  <div class="doctor-card__wrapper">
    <div class="doctor-card__block">
      <div class="doctor-card__content">
        <div
            class="doctor-card__avatar"
            :class="{'skeleton': isLoading}"
        >
          <img :src="doctor.avatar ? pathToImg + doctor.avatar : defaultAvatar" alt="Not found">
        </div>
        <div class="doctor-card__inner">
          <div class="doctor-card__main">
            <div
                class="doctor-card__full-name name-lh-fz-24"
                :class="{'skeleton': isLoading}"
            >
              <router-link :to="{name: routesNames.doctor.name, params: { id: doctor.userId }}">
                {{ doctor.firstName }} {{ doctor.lastName }}
              </router-link>
            </div>
            <div
                class="doctor-card__specialties specialties-list"
                :class="{'skeleton': isLoading}"
            >
              <span
                  v-for="specialty in doctor.specialties"
                  :key="specialty.id"
                  class="specialties-list__item"
              >
                {{ specialty?.name ?? '' }}
              </span>
            </div>
            <div
                class="doctor-card__category"
                :class="{'skeleton': isLoading}"
            >
              <span>{{ doctor.categoryName }}</span>
            </div>
          </div>
          <div
              class="doctor-card__experience experience"
              :class="{'skeleton': isLoading}"
          >
            <span class="experience__number">{{ doctor.experience }}</span>
            <span class="experience__text">experience</span>
          </div>
          <div
              class="doctor-card__description"
              :class="{'skeleton': isLoading}"
          >
            <p v-if="!isLoading">
              {{ doctor.about }}
            </p>
          </div>
          <div
              class="doctor-card__price"
              :class="{'skeleton': isLoading}"
          >
            <span>{{ doctor.price }} UAH</span>
          </div>
        </div>
      </div>
    </div>
    <div class="doctor-card__block">
      <div class="doctor-card__slots doctor-slots">
        <div
            class="doctor-slots__title"
            :class="{'skeleton': isLoading}"
        >
          <span>Pre-entry</span>
        </div>
        <div
            class="doctor-slots__select-time"
            :class="{'skeleton': isLoading}"
        >
          <span>Select your desired time and wait for confirmation</span>
        </div>
        <div
            class="doctor-slots__days slots-days"
            :class="{'skeleton': isLoading}"
        >
          <div
              v-for="schedule in doctor.schedule"
              :key="`k-${schedule.day}`"
              class="slots-days__item"
              @click="getTimes(schedule.day)"
          >
            <span class="slots-days__week-day">{{ schedule.dayName }} {{ schedule.day }}</span>
            <span class="slots-days__date">{{ schedule.month }}</span>
          </div>
        </div>
        <ul
            class="doctor-slots__list visit-time"
            :class="{'skeleton': isLoading}"
        >
          <li
              v-for="item in visitTimes"
              :key="`k-${item}`"
              class="visit-time__item"
          >
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, ref, watch} from 'vue'
import routes from "../../router/routes-names";
import switchActiveSlot from "../../hooks/doctor/doctor-search/switch-active-slot.hook";

export default defineComponent({
  name: "DoctorListItem",
  props: {
    doctor: {
      type: Object,
      required: true
    },
    pathToImg: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
  },
  setup(props) {
    const visitTimes = ref([])

    const routesNames = computed(() => routes)
    const defaultAvatar = computed(() => require('../../assets/images/doctor.webp'))

    watch(() => props.doctor, (value) => {
      if (!props.isLoading) {
        visitTimes.value = props.doctor.schedule[0].time
      }
    }, {immediate: true})

    const getTimes = (day) => {
      const currentSchedule = props.doctor?.schedule.find(el => el.day === day)

      visitTimes.value = currentSchedule ? currentSchedule.time : props.doctor.schedule[0].time
    }

    switchActiveSlot()

    return {
      visitTimes,
      routesNames,
      defaultAvatar,
      getTimes
    }
  }
})
</script>

<style scoped lang="scss">

</style>
