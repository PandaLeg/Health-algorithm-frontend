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
      class="registration-clinic__working-hours"
  >
    <validate-each
        v-for="workingHourItem in item.workingHours"
        :key="workingHourItem.id"
        :state="workingHourItem"
        :rules="workingHourRule"
    >
      <template #default="{ v }">
        <working-hour-item
            :v="v"
            :item="workingHourItem"
        />
        <div
            v-if="workingHourItem.id !== 1"
            class="registration-clinic__calendar-minus"
        >
          <button @click="deleteSchedule(workingHourItem)">
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
import {watchAndGetCities} from "../../../hooks/registration/doctor/get-cities-clinic.hook";
import {onMounted} from "vue";
import {ValidateEach} from "@vuelidate/components";
import VSelect from "../../custom/VSelect.vue";
import WorkingHourItem from "./WorkingHourItem.vue";
import manageWorkingHourHook from "../../../hooks/registration/clinic/manage-working-hour.hook";
import CalendarPlusSVG from "../../svg/CalendarPlusSVG.vue";
import CalendarMinusSVG from "../../svg/CalendarMinusSVG.vue";

export default {
  name: "LocationItem",
  components: {CalendarPlusSVG, CalendarMinusSVG, WorkingHourItem, VSelect, ValidateEach, VAutocomplete},
  props: {
    item: {required: true},
    locationVuelidate: {default: false},
    vLocation: {required: true},
    workingHourRule: {required: true},
  },
  setup(props) {
    watchAndGetCities(props)

    const {addSchedule, deleteSchedule} = manageWorkingHourHook(props)

    onMounted(() => {
      props.locationVuelidate.push(props.vLocation)
    })

    return {
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
