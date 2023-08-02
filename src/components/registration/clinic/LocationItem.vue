<template>
  <div
      class="registration-clinic__city"
      :class="{'form-error': vLocation.city.$error}"
  >
    <label>City *</label>
    <VAutocomplete
        v-model="vLocation.city.$model"
        v-model:search="item.searchCity"
        :items="item.cities"
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
  <div
      v-if="vLocation.city.$model"
      class="registration-clinic__address"
      :class="{'form-error': vLocation.address.$error}"
  >
    <label>Address *</label>
    <input
        v-model="vLocation.address.$model"
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
      v-if="vLocation.city.$model"
      class="registration-clinic__schedule"
  >
    <validate-each
        v-for="scheduleItem in item.schedule"
        :key="scheduleItem.id"
        :state="scheduleItem"
        :rules="scheduleRule"
    >
      <template #default="{ v }">
        <schedule-item
            :v="v"
            :item="scheduleItem"
            :current-location-vuelidate="currentLocationVuelidate"
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

<script>
import VAutocomplete from "../../custom/VAutocomplete.vue";
import {watchAndGetCities} from "../../../hooks/registration/get-cities-clinic.hook";
import {onMounted, ref} from "vue";
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
    item: {required: true},
    locationVuelidate: {required: true},
    vLocation: {required: true},
    scheduleRule: {required: true},
    weekDays: {required: true},
  },
  setup(props) {
    const currentLocationVuelidate = ref([])
    watchAndGetCities(props.item)

    const {addSchedule, deleteSchedule} = manageScheduleHook(props)

    onMounted(() => {
      currentLocationVuelidate.value.push(props.vLocation)
      props.locationVuelidate.push(currentLocationVuelidate)
    })

    return {
      currentLocationVuelidate,
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
