<template>
  <div class="clinic">
    <div class="clinic__container container">
      <clinic-main
          v-model:appointment-schedule="appointmentSchedule"
          v-model:is-active="isActive"
          v-model:doctor-id="appointment.doctorId"
          v-model:date-appointment="appointment.dateAppointment"
          v-model:time="appointment.time"
          v-model:working-hours="workingHours"
          v-model:doctors-for-appointments="doctorsForAppointments"
          :clinic="clinic"
          :has-clinic-info="hasClinicInfo"
          :v$="v$"
          :store="store"
          @make-appointment="makeAppointment"
      />
      <div class="clinic__tabs clinic-tabs">
        <div class="clinic-tabs__box">
          <button class="clinic-tabs__switch-btn switch-btn">
            <span class="switch-btn__content">Info</span>
            <span class="switch-btn__line-wrapper">
              <span class="switch-btn__line"></span>
            </span>
          </button>
          <button
              class="clinic-tabs__switch-btn switch-btn"
              @click="getClinicsWithoutCurrent"
          >
            <span class="switch-btn__content">Clinics</span>
            <span class="switch-btn__line-wrapper">
              <span class="switch-btn__line"></span>
            </span>
          </button>
          <button
              class="clinic-tabs__switch-btn switch-btn"
              @click="getDoctors"
          >
            <span class="switch-btn__content">Doctors</span>
            <span class="switch-btn__line-wrapper">
              <span class="switch-btn__line"></span>
            </span>
          </button>
          <div class="clinic-tabs__active-line"></div>
        </div>
        <div class="clinic-tabs__content tabs-content">
          <div class="tabs-content__wrapper tabs-content__description content-active">
            <h2>Description</h2>
            <p>
              {{ clinic.description }}
            </p>
          </div>
          <div class="tabs-content__wrapper tabs-content__clinics">
            <h2>Clinics</h2>
            <clinic-list :clinics="clinics">
              <template #listItem="scope">
                <clinic-list-sub-item :clinic="scope.clinic"/>
              </template>
            </clinic-list>
            <v-pagination
                v-if="clinics.length && totalPages > 1"
                :current-page="page"
                :total-pages="totalPages"
                @next-page="nextClinicPage"
            />
          </div>
          <div class="tabs-content__wrapper tabs-content__doctors">
            <h2>Doctors</h2>
            <doctor-sub-list :doctors="doctors"/>
            <v-pagination
                v-if="doctors.length && doctorTotalPages > 1"
                :current-page="doctorPage"
                :total-pages="doctorTotalPages"
                @next-page="nextDoctorPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import regMountedStateHook from "../../hooks/reg-mounted-state.hook";
import ClinicListItem from "../../components/clinic/ClinicListItem.vue";
import initStateHook from "../../hooks/clinic/specific-clinic/init-state.hook";
import switchActiveTabHook from "../../hooks/clinic/specific-clinic/switch-active-tab.hook";
import getClinicsWithoutCurrentHook from "../../hooks/clinic/specific-clinic/get-clinics-without-current.hook";
import ClinicList from "../../components/clinic/ClinicList.vue";
import ClinicListSubItem from "../../components/clinic/ClinicListSubItem.vue";
import ClinicMain from "../../components/clinic/ClinicMain.vue";
import DoctorCard from "../../components/doctor/DoctorCard.vue";
import {useVuelidate} from "@vuelidate/core";
import computedErrorsHook from "../../hooks/clinic/specific-clinic/computed-errors.hook";
import makeAppointmentHook from "../../hooks/doctor/specific-doctor/make-appointment.hook";
import {useStore} from "vuex";
import {vuexTypes} from "../../store/vuexTypes";
import getDoctorsHook from "../../hooks/clinic/specific-clinic/get-clinic-doctors.hook";
import DoctorSubList from "../../components/doctor/DoctorSubList.vue";
import VPagination from "../../components/custom/VPagination.vue";

export default {
  name: "ClinicPage",
  components: {VPagination, DoctorSubList, DoctorCard, ClinicMain, ClinicListSubItem, ClinicList, ClinicListItem},
  setup() {
    regMountedStateHook()
    const store = useStore()
    const user = store.getters[vuexTypes.user]

    const {
      clinic,
      hasClinicInfo,
      clinics,
      page,
      perPage,
      totalPages,
      appointment,
      appointmentSchedule,
      isActive,
      workingHours,
      doctorsForAppointments,
      appointmentRule,
      doctors,
      doctorPage,
      doctorPerPage,
      doctorTotalPages
    } = initStateHook()

    switchActiveTabHook()

    const v$ = useVuelidate(appointmentRule, appointment)
    const {isValid} = computedErrorsHook(v$)
    const {getClinicsWithoutCurrent, nextClinicPage} = getClinicsWithoutCurrentHook(clinic, clinics, page, perPage, totalPages)
    const {getDoctors, nextDoctorPage} = getDoctorsHook(doctors, doctorPage, doctorPerPage, doctorTotalPages)

    const {makeAppointment} = makeAppointmentHook(appointment, v$, isActive, user.id, isValid, store)
    return {
      clinic,
      clinics,
      hasClinicInfo,
      appointment,
      appointmentSchedule,
      isActive,
      workingHours,
      doctorsForAppointments,
      page,
      totalPages,
      doctors,
      doctorPage,
      doctorTotalPages,
      v$,
      store,
      getClinicsWithoutCurrent,
      nextClinicPage,
      getDoctors,
      nextDoctorPage,
      makeAppointment
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/scss/clinic-card";
@import "src/assets/scss/clinic-sub-card";
@import "src/assets/scss/doctor-card";
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";
@import "src/assets/scss/icons";

%active-line {
  height: 3px;
  border-radius: 10px;
  border-top-width: 2px;
  background-color: #0fb4a8;
}

.clinic {
  height: 100%;

  &__container {
    max-width: 750px;
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  &__tabs {
    background: $white;
    padding: 20px;
    box-shadow: 2px 2px 15px rgb(128 142 184 / 10%);
    border-radius: 15px;

    @media screen and (max-width: $md4 + 'px') {
      padding: 10px;
    }
  }
}

.doctor {
  &__sub-list {
    margin-bottom: 20px;
  }
}

.main-card {
  margin-bottom: 25px;
}

.clinic-tabs {
  &__box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    border-bottom: 2px solid rgb(229, 229, 229);
    position: relative;
  }

  &__active-line {
    position: absolute;
    bottom: -2px;
    left: 73px;
    width: 63px;
    opacity: 0;
    transition: $transition03;
    @extend %active-line;
  }

  &__switch-btn {
    position: relative;
    font-size: 18px;
    font-weight: 700;
    color: #919191;
    background: none;
    border: none;
    cursor: pointer;
    height: 40px;
    padding: 0 8px;

    @media screen and (max-width: $md4 + 'px') {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
  }

  &__content {
    padding: 10px;

    @media screen and (max-width: $md4 + 'px') {
      padding: 5px;
    }
  }
}

.switch-btn {
  &__line-wrapper {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  &__line {
    position: absolute;
    opacity: 0;
    left: 0;
    bottom: -2px;
  }

  &.tab-active {
    color: $darkTeal2;

    .switch-btn__line {
      align-self: flex-end;
      width: 100%;
      @extend %active-line;
    }
  }
}

.appointment-form {
  display: flex;
  flex-direction: column;

  &__input:not(:last-child) {
    margin-bottom: 10px;
  }
}

.tabs-content {
  &__wrapper {
    display: none;
    padding-top: 10px;

    & > h2 {
      margin-bottom: 15px;
      font-size: 18px;
      font-weight: 700;
    }

    & > p {
      line-height: 16px;
      font-size: 13px;
    }

    &.content-active {
      display: block;
    }
  }
}

.input-error {
  @extend %input-error;
}

.form-error {
  input, select {
    @extend %form-error;
  }
}

input {
  @extend %field-reg;
}

label {
  @extend %label-reg;
}

</style>
