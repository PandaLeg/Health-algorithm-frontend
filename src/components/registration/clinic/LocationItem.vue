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
              v-model:current-location-vuelidate="currentLocationVuelidate"
              :v="v"
              :days="days"
              :types="scheduleItem.types"
          />
          <div
              v-if="scheduleItem.id !== 1"
              class="registration-clinic__calendar-minus"
          >
            <button @click="deleteSchedule(scheduleItem)">
              <calendar-minus-s-v-g/>
            </button>
          </div>
        </template>
      </validate-each>
      <div class="registration-clinic__calendar-plus">
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
import manageScheduleHook from "../../../hooks/registration/clinic/manage-schedule.hook";
import CalendarPlusSVG from "../../svg/CalendarPlusSVG.vue";
import CalendarMinusSVG from "../../svg/CalendarMinusSVG.vue";

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
    locationVuelidate: {required: true},
    vLocation: {required: true},
    scheduleRule: {required: true},
    days: {required: true},
  },
  setup(props, {emit}) {
    const currentLocationVuelidate = ref([])
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

    watchAndGetCities(modelSearchCity, emit)

    const {addSchedule, deleteSchedule} = manageScheduleHook(props, emit)

    onMounted(() => {
      currentLocationVuelidate.value.push(props.vLocation)
      emit('update:location-vuelidate', [...props.locationVuelidate, currentLocationVuelidate])
    })

    return {
      currentLocationVuelidate,
      modelSearchCity,
      modelCity,
      modelAddress,
      modelConveniences,
      addSchedule,
      deleteSchedule
    }
  },
}
</script>

<style scoped lang="scss">
.registration-clinic {
  &__calendar-minus, &__calendar-plus {
    text-align: center;

    button {
      height: 30px;
      background-color: #fff;
      font-size: 30px;
    }
  }

  &__calendar-minus {
    margin-bottom: 10px;
  }
}
</style>
