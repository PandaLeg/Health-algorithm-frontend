<template>
  <div class="appointment">
    <div class="appointment__container container">
      <div
          v-if="appointments.length"
          class="appointment__list appointment-list"
      >
        <div
            v-for="appointment in appointments"
            :key="appointment.id"
            class="appointment-list__card appointment-card"
        >
          <div class="appointment-card__wrapper">
            <div class="appointment-card__title">
              <h2>Appointment info</h2>
            </div>
            <div class="appointment-card__info">
              <div class="appointment-card__block appointment-block">
                <div class="appointment-block__icon">
                  <i :class="getIcon(1)"></i>
                </div>
                <div class="appointment-block__full-name">
                  <span>{{ appointment.patient.firstName }} {{ appointment.patient.lastName }}</span>
                </div>
                <div class="appointment-block__phone">
                  <span>{{ appointment.patient.phone }}</span>
                </div>
              </div>
              <div class="appointment-card__block appointment-block">
                <div class="appointment-block__icon">
                  <i :class="getIcon(2)"></i>
                </div>
                <div class="appointment-block__full-name">
                  <span>{{ appointment.doctor.firstName }} {{ appointment.doctor.lastName }}</span>
                </div>
                <div class="appointment-block__specialties appointment-specialties">
                <span
                    v-for="specialty in appointment.doctor.specialties"
                    :key="specialty.id"
                    class="appointment-specialties__item"
                >
                  {{ specialty.name }}
                </span>
                </div>
                <div class="appointment-card__look">
                  <button class="btn">
                    <span class="btn__content">Look</span>
                  </button>
                </div>
              </div>
              <div class="appointment-card__block appointment-block">
                <div class="appointment-block__icon">
                  <i :class="getIcon(3)"></i>
                </div>
                <div class="appointment-block__full-name">
                  <span>{{ appointment.clinicBranch.name }}</span>
                </div>
                <div class="appointment-block__city">
                  <span>{{ appointment.clinicBranch.city }}</span>
                </div>
                <div class="appointment-block__address">
                  <span>{{ appointment.clinicBranch.address }}</span>
                </div>
                <div class="appointment-card__look">
                  <button class="btn">
                    <span class="btn__content">Look</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="appointment-card__price">
              Cost: <span>250$</span>
            </div>
            <div class="appointment-card__date-time">
              Date:
              <span class="appointment-card__date">{{ appointment.date }}</span>
              <span class="appointment-card__time">{{ appointment.time.substring(0, 5) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
          v-else
          class="not-found"
      >
        <span>Not found</span>
      </div>
      <VPagination
          v-if="appointments.length && totalPages > 1"
          :current-page="page"
          :total-pages="totalPages"
          @next-page="nextPage"
      />
    </div>
  </div>
</template>

<script>
import regMountedStateHook from "../../hooks/reg-mounted-state.hook";
import {getAppointmentIcons} from "../../util/get-icons";
import initStateHook from "../../hooks/appointment/init-state.hook";
import VPagination from "../../components/custom/VPagination.vue";
import getAppointments from "../../hooks/appointment/get-appointments.hook";

export default {
  name: "AppointmentPage",
  components: {VPagination},
  setup() {
    regMountedStateHook()

    const {appointments, page, perPage, totalPages} = initStateHook()
    const {nextPage} = getAppointments(appointments, page, perPage, totalPages)

    const getIcon = (iconId) => getAppointmentIcons(iconId)

    return {
      appointments,
      page,
      totalPages,
      getIcon,
      nextPage
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/icons";
@import "src/assets/scss/ui";

.appointment {
  height: 100%;

  &__container {
    max-width: 850px;
    margin: 0 auto;
    padding-top: 20px;
  }
}

.appointment-list {
  &__card {
    margin-bottom: 20px;
    background-color: $white;
    box-shadow: 2px 2px 15px rgb(128 142 184 / 10%);
  }
}

.appointment-card {
  border-radius: 10px;

  &__wrapper {
    padding: 20px 15px;
  }

  &__title {
    text-align: center;
    font-size: 20px;
    color: $darkBlue;
    font-weight: 700;
    margin-bottom: 20px;
  }

  &__info {
    display: flex;
    margin-bottom: 20px;

    @media screen and (max-width: $md5 + 'px') {
      flex-wrap: wrap;
      gap: 10px;
    }
  }

  &__block {
    flex: 0 1 33.333%;
    background-color: $white;
    box-shadow: 2px 2px 15px rgb(128 142 184 / 30%);
    border-radius: 15px;

    &:not(:last-child) {
      margin-right: 10px;
    }

    @media screen and (max-width: $md5 + 'px') {
      flex: 1 1 100%;

      &:not(:last-child) {
        flex: 0 1 calc(50% - 5px);
        margin-right: 0;
      }
    }

    @media screen and (max-width: $md4 + 'px') {
      flex: 1 1 100% !important;
    }
  }

  &__look {
    text-align: end;
  }

  &__price {
    color: $darkBlue;
    text-align: end;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;

    & > span {
      font-weight: 700;
    }
  }

  &__date-time {
    color: $darkBlue;
    text-align: end;
    font-weight: 500;
    font-size: 16px;
  }

  &__date, &__time {
    font-weight: 700;
  }

  &__date {
    margin-right: 5px;
  }
}

.appointment-block {
  display: flex;
  flex-direction: column;
  padding: 15px;
  color: $darkBlue;
  text-align: center;
  overflow: hidden;

  &__icon {
    font-size: 16px;
    margin-bottom: 10px;
  }

  &__full-name {
    word-break: break-word;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    margin-bottom: 5px;
  }

  &__phone {
    word-break: break-all;
    letter-spacing: 0.5px;
    font-weight: 500;
    flex: 1;
  }

  &__city {
    margin-bottom: 5px;
  }

  &__address {
    flex: 1;
    margin-bottom: 10px;
  }

  &__city, &__address {
    word-break: break-word;
    line-height: 16px;
  }
}

.appointment-specialties {
  flex: 1;
  font-size: 13px;
  line-height: 16px;
  word-break: break-word;
  margin-bottom: 10px;

  &__item {
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
}
</style>
