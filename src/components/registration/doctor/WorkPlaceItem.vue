<template>
  <div
      class="registration-doctor__clinic-city"
      :class="{'form-error': vPlace.city.$error}"
  >
    <label>City *</label>
    <VAutocomplete
        v-model="modelCity"
        v-model:search="modelSearchCity"
        :items="searchedCities"
        item-title="name"
        item-value="name"
        label="Write the name of city"
        dynamic
    />
    <div
        v-for="error in vPlace.city.$errors"
        :key="error.$uid"
        class="input-error"
    >
      {{ error.$message }}
    </div>
  </div>
  <div
      v-if="modelCity"
      class="registration-doctor__clinic-name"
      :class="{'form-error': vPlace.clinicName.$error}"
  >
    <label>Clinic *</label>
    <VAutocomplete
        v-model="modelClinicName"
        v-model:search="modelSearchClinic"
        :items="searchedClinics"
        item-title="name"
        item-value="clinicId"
        label="Write the name of clinic"
        dynamic
    />
    <div
        v-for="error in vPlace.clinicName.$errors"
        :key="error.$uid"
        class="input-error"
    >
      {{ error.$message }}
    </div>
  </div>
  <div
      v-if="modelCity && modelClinicName && addresses.length"
      class="registration-doctor__clinic-address"
      :class="{'form-error': vPlace.address.$error}"
  >
    <label>Address *</label>
    <VSelect
        v-model="modelAddress"
        :options="addresses"
        item-title="address"
        item-value="id"
        label="Select address"
    />
    <div
        v-for="error in vPlace.address.$errors"
        :key="error.$uid"
        class="input-error"
    >
      {{ error.$message }}
    </div>
  </div>
  <div
      v-if="modelCity && modelClinicName && addresses.length"
      class="registration-doctor__schedule"
  >
    <validate-each
        v-for="scheduleItem in schedule"
        :key="scheduleItem.id"
        :state="scheduleItem"
        :rules="scheduleRule"
    >
      <template #default="{ v }">
        <doctor-schedule-item
            v-model:week-day="v.weekDay.$model"
            v-model:from="v.from.$model"
            v-model:to="v.to.$model"
            v-model:duration="v.duration.$model"
            v-model:schedule-vuelidate="scheduleVuelidate"
            v-model:schedule-rule="modelScheduleRule"
            :v="v"
            :days="days"
            :clinic-branches="clinicBranches"
            :address-branch-id="modelAddress"
            :index-schedule="scheduleItem.id"
        />
        <div
            v-if="scheduleItem.id !== 1"
            class="registration-doctor__calendar-minus calendar-minus"
        >
          <button @click="deleteSchedule(scheduleItem)">
            <calendar-minus-s-v-g/>
          </button>
        </div>
      </template>
    </validate-each>
    <div class="registration-doctor__calendar-plus calendar-plus">
      <button @click="addDoctorSchedule">
        <calendar-plus-s-v-g/>
      </button>
    </div>
  </div>
</template>

<script>
import VAutocomplete from "../../custom/VAutocomplete.vue";
import {
  watchAndGetCities,
  watchAndGetClinics,
  watchAndGetAddresses
} from "../../../hooks/registration/get-cities-clinic.hook";
import {computed, onMounted, ref} from "vue";
import VSelect from "../../custom/VSelect.vue";
import {ValidateEach} from "@vuelidate/components";
import ScheduleItem from "../clinic/ScheduleItem.vue";
import CalendarPlusSVG from "../../svg/CalendarPlusSVG.vue";
import CalendarMinusSVG from "../../svg/CalendarMinusSVG.vue";
import manageScheduleHook from "../../../hooks/registration/manage-schedule.hook";
import DoctorScheduleItem from "./DoctorScheduleItem.vue";
import {updateLocationVuelidate, watchAndUpdateDays} from "../../../hooks/registration/watch-location.hook";

export default {
  name: "WorkPlaceForm",
  components: {
    DoctorScheduleItem,
    CalendarMinusSVG,
    CalendarPlusSVG,
    ScheduleItem,
    ValidateEach,
    VSelect,
    VAutocomplete
  },
  props: {
    city: {required: true},
    clinicName: {required: true},
    address: {required: true},
    searchCity: {required: true},
    searchClinic: {required: true},
    searchedCities: {required: true},
    searchedClinics: {required: true},
    clinicBranches: {required: true},
    addresses: {required: true},
    vPlace: {required: true},
    locationVuelidate: {default: () => []},
    schedule: {required: true},
    days: {required: true},
    scheduleRule: {required: true},
    indexLocation: {required: true},
  },
  setup(props, {emit}) {
    const scheduleVuelidate = ref([])
    const modelCity = computed({
      get: () => props.city,
      set: (val) => emit('update:city', val)
    })

    const modelClinicName = computed({
      get: () => props.clinicName,
      set: (val) => emit('update:clinic-name', val)
    })

    const modelAddress = computed({
      get: () => props.address,
      set: (val) => emit('update:address', val)
    })

    const modelSearchCity = computed({
      get: () => props.searchCity,
      set: (val) => emit('update:search-city', val)
    })

    const modelSearchClinic = computed({
      get: () => props.searchClinic,
      set: (val) => emit('update:search-clinic', val)
    })

    const modelScheduleRule = computed({
      get: () => props.scheduleRule,
      set: (val) => emit('update:schedule-rule', val)
    })

    onMounted(() => {
      scheduleVuelidate.value.push(props.vPlace)
      emit('update:location-vuelidate', [...props.locationVuelidate, scheduleVuelidate])
    })

    watchAndGetCities(modelSearchCity, emit)
    watchAndGetClinics(modelSearchClinic, modelCity, emit)
    watchAndGetAddresses(modelClinicName, modelCity, emit)

    updateLocationVuelidate(scheduleVuelidate, props, emit)
    watchAndUpdateDays(modelAddress, props, emit)

    const {addDoctorSchedule, deleteSchedule} = manageScheduleHook(props, emit, scheduleVuelidate)

    return {
      modelCity,
      modelClinicName,
      modelAddress,
      modelSearchCity,
      modelSearchClinic,
      modelScheduleRule,
      scheduleVuelidate,
      addDoctorSchedule,
      deleteSchedule
    }
  },
}
</script>

<style scoped lang="scss">
.registration-doctor {
  &__clinic-city, &__clinic-name, &__clinic-address {
    margin-bottom: 15px;
  }

  &__calendar-minus, &__calendar-plus {
    margin-bottom: 10px;
  }
}
</style>
