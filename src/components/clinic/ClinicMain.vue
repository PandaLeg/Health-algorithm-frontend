<template>
  <div
      v-if="hasClinicInfo"
      class="clinic__main-card main-card clinic-card"
  >
    <clinic-list-item
        :clinic="clinic"
        :path-to-img="pathToImg"
    >
      <template #default>
        <div class="clinic-card__conveniences clinic-conveniences">
          <div
              v-for="convenience in clinic.conveniences"
              :key="convenience.id"
              class="clinic-conveniences__item"
          >
            <i
                class="clinic-conveniences__icon"
                :class="getIcon(convenience.id)">
            </i>
            <span>{{ convenience.name }}</span>
          </div>
        </div>
        <div class="clinic-card__schedule clinic-schedule">
          <div
              v-for="schedule in clinic.schedule"
              :key="schedule.id"
              class="clinic-schedule__item"
          >
            <span>{{ schedule.addressInfo }};</span>
          </div>
        </div>
        <div class="clinic-card__address">
          <span>{{ clinic.address }}</span>
        </div>
        <div
            v-if="isPatient"
            class="clinic-card__make-appointment"
        >
          <button
              class="btn"
              @click="activateModal"
          >
            <span class="btn__content">Make appointment</span>
          </button>
        </div>
        <v-dialog
            v-if="isActive"
            :title="'Make appointment'"
            width="400"
        >
          <template #content>
            <form class="appointment-form">
              <div
                  class="appointment-form__input appointment-form__doctor"
                  :class="{'form-error': v$.doctorId.$error}"
              >
                <label>Doctor *</label>
                <v-select
                    v-model="modelDoctorId"
                    :options="doctorsForAppointments"
                    item-title="fullName"
                    item-value="doctorId"
                    label="Select doctor"
                />
                <div
                    v-for="error in v$.doctorId.$errors"
                    :key="error.$uid"
                    class="input-error"
                >
                  {{ error.$message }}
                </div>
              </div>
              <div
                  v-if="modelDoctorId"
                  class="appointment-form__input appointment-form__date"
                  :class="{'form-error': v$.dateAppointment.$error}"
              >
                <label>Day of week *</label>
                <input
                    v-model="modelDateAppointment"
                    type="date"
                    placeholder="Select day of week"
                    required
                />
                <div
                    v-for="error in v$.dateAppointment.$errors"
                    :key="error.$uid"
                    class="input-error"
                >
                  {{ error.$message }}
                </div>
              </div>
              <div
                  v-if="modelDateAppointment"
                  class="appointment-form__input appointment-form__time"
                  :class="{'form-error': v$.time.$error}"
              >
                <label>Appointment time *</label>
                <v-select
                    v-model="modelTime"
                    :options="workingHours"
                    label="Select time"
                />
                <div
                    v-for="error in v$.time.$errors"
                    :key="error.$uid"
                    class="input-error"
                >
                  {{ error.$message }}
                </div>
              </div>
            </form>
          </template>
          <template #actions>
            <button
                class="btn"
                @click="$emit('update:is-active', false)"
            >
              <span class="btn__content">Close</span>
            </button>
            <button
                class="btn"
                @click="$emit('make-appointment')"
            >
              <span class="btn__content">Sent</span>
            </button>
          </template>
        </v-dialog>
      </template>
    </clinic-list-item>
  </div>
</template>

<script>
import ClinicListItem from "./ClinicListItem.vue";
import {computed, defineAsyncComponent} from "vue";
import routes from "../../router/routesNames";
import {config} from "../../util/config";
import getClinicIcon from "../../util/get-clinic-icon";
import VSelect from "../custom/VSelect.vue";
import {vuexTypes} from "../../store/vuexTypes";
import getAppointmentScheduleHook from "../../hooks/doctor/specific-doctor/get-appointment-schedule.hook";
import updateWorkingHoursHook from "../../hooks/doctor/specific-doctor/update-working-hours.hook";

export default {
  name: "ClinicMain",
  components: {
    VSelect,
    VDialog: defineAsyncComponent(() => import('../../components/custom/VDialog.vue')),
    ClinicListItem
  },
  props: {
    hasClinicInfo: {
      type: Boolean,
      required: true
    },
    clinic: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    doctorId: {
      type: [String, null],
      required: true
    },
    dateAppointment: {
      type: [String, null],
      required: true
    },
    time: {
      type: [String, null],
      required: true
    },
    appointmentSchedule: {
      type: Array,
      required: true
    },
    workingHours: {
      type: Array,
      required: true
    },
    doctorsForAppointments: {
      type: Array,
      required: true
    },
    v$: {
      type: Object,
      required: true
    },
    store: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const store = props.store

    const isLoggedIn = store.getters[vuexTypes.isLoggedIn]
    const user = store.getters[vuexTypes.user]

    const routesNames = computed(() => routes)
    const pathToImg = computed(() => config.apiUrl + '/')

    const isPatient = computed(() => {
      return !isLoggedIn || isLoggedIn && user.roles.includes('PATIENT')
    })

    const modelDoctorId = computed({
      get: () => props.doctorId,
      set: (val) => emit('update:doctor-id', val)
    })

    const modelDateAppointment = computed({
      get: () => props.dateAppointment,
      set: (val) => emit('update:date-appointment', val)
    })

    const modelTime = computed({
      get: () => props.time,
      set: (val) => emit('update:time', val)
    })

    const {appointmentScheduleForClinic} = getAppointmentScheduleHook(emit, store)

    const getDoctorById = (appointmentSchedule) => {
      return appointmentSchedule.value.find(sh => sh.doctorId === modelDoctorId.value)
    }
    updateWorkingHoursHook(modelDateAppointment, modelTime, getDoctorById, props, emit, modelDoctorId)

    const activateModal = () => {
      if (!isLoggedIn) {
        store.commit(vuexTypes.UPDATE_NOTIFICATION,'Please log in as a patient')
      } else {
        emit('update:is-active', true)
        appointmentScheduleForClinic()
      }
    }
    const getIcon = (convenienceId) => getClinicIcon(convenienceId)

    return {
      routesNames,
      pathToImg,
      modelDoctorId,
      modelDateAppointment,
      modelTime,
      isPatient,
      getIcon,
      activateModal
    }
  }
}
</script>

<style scoped lang="scss">

</style>
