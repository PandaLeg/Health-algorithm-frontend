<template>
  <div
      class="registration-clinic__city"
      :class="{'form-error': vLocation.city.$error}"
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
        v-for="error in vLocation.city.$errors"
        :key="error.$uid"
        class="input-error"
    >
      {{ error.$message }}
    </div>
  </div>
  <template v-if="modelCity">
    <div
        class="registration-clinic__address"
        :class="{'form-error': vLocation.address.$error}"
    >
      <label>Address *</label>
      <input
          v-model="modelAddress"
          placeholder="Enter address"
          required
      >
      <div
          v-for="error in vLocation.address.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
    <div
        class="registration-clinic__conveniences"
        :class="{'form-error': vLocation.conveniences.$error}"
    >
      <label>Conveniences *</label>
      <VAutocomplete
          v-model="modelConveniences"
          :items="convenienceItems"
          item-title="name"
          item-value="id"
          label="Select convenience"
          multiple
      />
      <div
          v-for="error in vLocation.conveniences.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
    <div
        class="registration-clinic__schedule"
    >
      <validate-each
          v-for="scheduleItem in schedule"
          :key="scheduleItem.id"
          :state="scheduleItem"
          :rules="scheduleRule"
      >
        <template #default="{ v }">
          <schedule-item
              v-model:week-days="v.weekDays.$model"
              v-model:day-type="v.dayType.$model"
              v-model:from="v.from.$model"
              v-model:to="v.to.$model"
              v-model:schedule-vuelidate="scheduleVuelidate"
              v-model:schedule-rule="modelScheduleRule"
              :v="v"
              :days="days"
              :types="scheduleItem.types"
              :index-schedule="scheduleItem.id"
          />
          <div
              v-if="scheduleItem.id !== 1"
              class="registration-clinic__calendar-minus calendar-minus"
          >
            <button @click="deleteSchedule(scheduleItem)">
              <calendar-minus-s-v-g/>
            </button>
          </div>
        </template>
      </validate-each>
      <div class="registration-clinic__calendar-plus calendar-plus">
        <button @click="addSchedule">
          <calendar-plus-s-v-g/>
        </button>
      </div>
    </div>
  </template>
</template>

<script>
import VAutocomplete from "../../custom/VAutocomplete.vue";
import {watchAndGetCities} from "../../../hooks/registration/get-cities-clinic.hook";
import {computed, onMounted, ref} from "vue";
import {ValidateEach} from "@vuelidate/components";
import VSelect from "../../custom/VSelect.vue";
import ScheduleItem from "./ScheduleItem.vue";
import manageScheduleHook, {manageClinicSchedule} from "../../../hooks/registration/manage-schedule.hook";
import CalendarPlusSVG from "../../svg/CalendarPlusSVG.vue";
import CalendarMinusSVG from "../../svg/CalendarMinusSVG.vue";
import {updateLocationVuelidate} from "../../../hooks/registration/watch-location.hook";

export default {
  name: "LocationItem",
  components: {CalendarPlusSVG, CalendarMinusSVG, ScheduleItem, VSelect, ValidateEach, VAutocomplete},
  props: {
    city: {required: true},
    address: {required: true},
    conveniences: {required: true},
    searchedCities: {required: true},
    searchCity: {required: true},
    convenienceItems: {required: true},
    schedule: {required: true},
    locationVuelidate: {default: () => []},
    vLocation: {required: true},
    scheduleRule: {required: true},
    days: {required: true},
    indexLocation: {required: true},
  },
  setup(props, {emit}) {
    const scheduleVuelidate = ref([])
    const modelSearchCity = computed({
      get: () => props.searchCity,
      set: (val) => emit('update:search-city', val)
    })

    const modelCity = computed({
      get: () => props.city,
      set: (val) => emit('update:city', val)
    })

    const modelAddress = computed({
      get: () => props.address,
      set: (val) => emit('update:address', val)
    })

    const modelConveniences = computed({
      get: () => props.conveniences,
      set: (val) => emit('update:conveniences', val)
    })

    const modelScheduleRule = computed({
      get: () => props.scheduleRule,
      set: (val) => emit('update:schedule-rule', val)
    })

    watchAndGetCities(modelSearchCity, emit)
    updateLocationVuelidate(scheduleVuelidate, props, emit)

    const {addSchedule, deleteSchedule} = manageClinicSchedule(props, emit, scheduleVuelidate)

    onMounted(() => {
      scheduleVuelidate.value.push(props.vLocation)
      emit('update:location-vuelidate', [...props.locationVuelidate, scheduleVuelidate])
    })

    return {
      scheduleVuelidate,
      modelSearchCity,
      modelCity,
      modelAddress,
      modelConveniences,
      modelScheduleRule,
      addSchedule,
      deleteSchedule
    }
  },
}
</script>

<style lang="scss">
.registration-clinic {
  &__calendar-minus, &__calendar-plus {
    margin-bottom: 10px;
  }
}
</style>
