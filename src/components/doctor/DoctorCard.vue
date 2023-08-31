<template>
  <div class="doctor__card doctor-card">
    <div class="doctor-card__wrapper-layout">
      <div class="doctor-card__info">
        <div class="doctor-card__avatar">
          <img :src="doctor.avatar ? pathToImg + doctor.avatar : defaultAvatar" alt="Not found">
        </div>
        <div class="doctor-card__inner">
          <div class="doctor-card__main">
            <div class="doctor-card__full-name">
              <span>{{ doctor.firstName }} {{ doctor.lastName }} </span>
            </div>
            <div class="doctor-card__specialties specialties-list">
                    <span
                        v-for="specialty in doctor.specialties"
                        :key="specialty.id"
                        class="specialties-list__item"
                    >
                      {{ specialty?.name ?? '' }}
                    </span>
            </div>
            <div class="doctor-card__category">
              <span>{{ doctor.categoryName }}</span>
            </div>
          </div>
          <div class="doctor-card__experience experience">
            <span class="experience__number">{{ doctor.experience }}</span>
            <span class="experience__text">experience</span>
          </div>
          <div class="doctor-card__description">
            <p>
              {{ doctor.about }}
            </p>
          </div>
          <div class="doctor-card__price">
            <span>250$</span>
          </div>
          <div
              v-if="isPatient"
              class="doctor-card__make-appointment"
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
                    class="appointment-form__input appointment-form__address"
                    :class="{'form-error': v$.clinicBranchId.$error}"
                >
                  <label>Address *</label>
                  <v-select
                      v-model="modelClinicBranch"
                      :options="clinics"
                      item-title="address"
                      item-value="clinicBranchId"
                      label="Select address"
                  />
                  <div
                      v-for="error in v$.clinicBranchId.$errors"
                      :key="error.$uid"
                      class="input-error"
                  >
                    {{ error.$message }}
                  </div>
                </div>
                <div
                    v-if="modelClinicBranch"
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
                  @click="isActive = false"
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
        </div>
      </div>
      <div class="doctor-card__divider"></div>
      <div class="doctor-card__clinics">
        <clinic-list :clinics="clinics">
          <template #listItem="scope">
            <sub-clinic-list-item
                :path-to-img="scope.pathToImg"
                :clinic="scope.clinic"
            />
          </template>
        </clinic-list>
      </div>
    </div>
  </div>
</template>

<script>
import ClinicList from "../clinic/ClinicList.vue";
import VSelect from "../custom/VSelect.vue";
import SubClinicListItem from "../clinic/SubClinicListItem.vue";
import {computed, defineAsyncComponent} from "vue";
import routes from "../../router/routesNames";
import {config} from "../../util/config";
import getAppointmentScheduleHook from "../../hooks/doctor/specific-doctor/get-appointment-schedule.hook";
import updateWorkingHoursHook from "../../hooks/doctor/specific-doctor/update-working-hours.hook";
import {useStore} from "vuex";
import {vuexTypes} from "../../store/vuexTypes";

export default {
  name: "DoctorCard",
  components: {
    VDialog: defineAsyncComponent(() => import('../../components/custom/VDialog.vue')),
    SubClinicListItem,
    VSelect,
    ClinicList
  },
  props: {
    doctor: {
      type: Object,
      required: true
    },
    clinics: {
      type: Array,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    clinicBranches: {
      type: Array,
      required: true
    },
    appointmentSchedule: {
      type: Array,
      required: true
    },
    clinicBranchId: {
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
    workingHours: {
      type: Array,
      required: true
    },
    v$: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const store = useStore()

    const isLoggedIn = store.getters[vuexTypes.isLoggedIn]
    const user = store.getters[vuexTypes.user]

    const isPatient = computed(() => {
      return !isLoggedIn || isLoggedIn && user.roles.includes('PATIENT')
    })

    const routesNames = computed(() => routes)
    const defaultAvatar = computed(() => require('../.././assets/images/doctor.webp'))
    const pathToImg = computed(() => config.apiUrl + '/')

    const modelClinicBranch = computed({
      get: () => props.clinicBranchId,
      set: (val) => emit('update:clinic-branch-id', val)
    })

    const modelDateAppointment = computed({
      get: () => props.dateAppointment,
      set: (val) => emit('update:date-appointment', val)
    })

    const modelTime = computed({
      get: () => props.time,
      set: (val) => emit('update:time', val)
    })

    const {getAppointmentSchedule} = getAppointmentScheduleHook(props.clinicBranches, emit, store)

    updateWorkingHoursHook(modelDateAppointment, modelClinicBranch, modelTime, props, emit)

    const activateModal = () => {

      if (!isLoggedIn) {
        store.commit(vuexTypes.UPDATE_NOTIFICATION,'Please log in as a patient')
      } else {
        emit('update:is-active', true)
        getAppointmentSchedule()
      }
    }

    return {
      routesNames,
      defaultAvatar,
      pathToImg,
      modelClinicBranch,
      modelDateAppointment,
      modelTime,
      isPatient,
      activateModal
    }
  }
}
</script>


<style scoped lang="scss">

</style>
