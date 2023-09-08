<template>
  <div class="doctor">
    <div class="doctor__container container">
      <doctor-card
          v-model:appointment-schedule="appointmentSchedule"
          v-model:is-active="isActive"
          v-model:clinic-branch-id="appointment.clinicBranchId"
          v-model:date-appointment="appointment.dateAppointment"
          v-model:time="appointment.time"
          v-model:working-hours="workingHours"
          :clinic-branches="clinicBranches"
          :doctor="doctor"
          :clinics="clinics"
          :v$="v$"
          :doctor-id="doctorId"
          :store="store"
          @make-appointment="makeAppointment"
      />
      <div class="doctor__description doctor-description">
        <div class="doctor-description__wrapper">
          <div class="doctor-description__about">
            <h2>About</h2>
            <p>
              {{ doctor.about }}
            </p>
          </div>
          <div class="doctor-description__education">
            <h2>Education</h2>
            <p>
              {{ doctor.education }}
            </p>
          </div>
          <div class="doctor-description__course">
            <h2>Courses</h2>
            <p>
              {{ doctor.course }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import regMountedStateHook from "../../hooks/reg-mounted-state.hook";
import ClinicList from "../../components/clinic/ClinicList.vue";
import initStateHook from "../../hooks/doctor/specific-doctor/init-state.hook";
import VSelect from "../../components/custom/VSelect.vue";
import DoctorCard from "../../components/doctor/DoctorCard.vue";
import {useVuelidate} from "@vuelidate/core";
import computedErrorsHook from "../../hooks/doctor/specific-doctor/computed-errors.hook";
import makeAppointmentHook from "../../hooks/doctor/specific-doctor/make-appointment.hook";
import {useStore} from "vuex";
import {vuexTypes} from "../../store/vuexTypes";

export default {
  name: "DoctorPage",
  components: {
    DoctorCard,
    VSelect,
    ClinicList,
  },
  setup() {
    regMountedStateHook()

    const {
      doctor,
      clinics,
      appointment,
      workingHours,
      appointmentSchedule,
      appointmentRule,
      isActive,
      clinicBranches,
      doctorId
    } = initStateHook()

    const store = useStore()
    const user = store.getters[vuexTypes.user]

    const v$ = useVuelidate(appointmentRule, appointment)
    const {isValid} = computedErrorsHook(v$)
    const {makeAppointment} = makeAppointmentHook(appointment, v$, isActive, user.id, isValid, store)

    return {
      doctor,
      clinics,
      appointment,
      appointmentSchedule,
      workingHours,
      isActive,
      clinicBranches,
      v$,
      doctorId,
      store,
      makeAppointment
    }
  },
}
</script>


<style lang="scss">
@import "src/assets/scss/doctor-card";
@import "src/assets/scss/icons";
@import "src/assets/scss/clinic-card";
@import "src/assets/scss/clinic-sub-card";
@import "src/assets/scss/ui";

%location-text {
  line-height: 16px;
  color: #707272;
  font-size: 13px;
  font-weight: 500;
}

.doctor {
  height: 100%;

  &__container {
    max-width: 750px;
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 30px;

    @media screen and (max-width: $md3 + 'px') {
      max-width: none;
    }
  }

  &__description {
    margin-top: 20px;
    background: $white;
    padding: 20px;
    box-shadow: 2px 2px 15px rgb(128 142 184 / 10%);
    border-radius: 15px;
  }
}

.doctor-card {
  &__wrapper-layout {
    padding-top: 20px;
  }

  &__info {
    display: flex;
    position: relative;

    @media screen and (max-width: $md4 + px) {
      flex-direction: column;
      padding: 0 10px;
    }
  }

  &__clinics {
    padding: 0 20px 20px;

    @media screen and (max-width: $md4 + px) {
      padding: 0 10px 20px;
    }
  }

  &__divider {
    background-color: rgb(229, 229, 229);
    height: 1px;
    margin: 0 20px 20px;
  }
}

.doctor-description {
  &__wrapper {
  }

  &__about, &__education, &__course {
    margin-bottom: 15px;

    & > h2 {
      margin-bottom: 5px;
      font-size: 18px;
      font-weight: 700;
    }

    & > p {
      line-height: 16px;
      font-size: 13px;
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
