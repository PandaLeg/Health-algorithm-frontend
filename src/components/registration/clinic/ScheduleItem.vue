<template>
  <div class="registration__week registration-week">
    <div
        class="registration-week__day"
        :class="{'form-error': v.weekDays.$error}"
    >
      <label>Week day *</label>
      <VAutocomplete
          v-model="modelWeekDays"
          :items="days"
          item-title="name"
          item-value="id"
          label="Select day of week"
          multiple
          same
      />
      <div
          v-for="error in v.weekDays.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
    <div
        class="registration-week__day-type"
        :class="{'form-error': v.dayType.$error}"
    >
      <label>Day type *</label>
      <VSelect
          v-model="modelDayType"
          :options="types"
          item-title="name"
          item-value="name"
          label="Select type of day"
      />
      <div
          v-for="error in v.dayType.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
  </div>
  <div
      v-if="modelDayType === 'Workday'"
      class="registration-week__time"
  >
    <div
        class="registration-week__from"
        :class="{'form-error': v.from.$error}"
    >
      <label>From *</label>
      <input
          v-model="modelFrom"
          placeholder="Select from time"
          type="time"
          required
      >
      <div
          v-for="error in v.from.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>

    <div
        class="registration-week__to"
        :class="{'form-error': v.to.$error}"
    >
      <label>To *</label>
      <input
          v-model="modelTo"
          placeholder="Select to time"
          type="time"
          required
      >
      <div
          v-for="error in v.to.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
  </div>
</template>


<script>
import VAutocomplete from "../../custom/VAutocomplete.vue";
import VSelect from "../../custom/VSelect.vue";
import {computed, onMounted} from "vue";
import {updateScheduleVuelidate} from "../../../hooks/registration/watch-location.hook";

export default {
  name: "ScheduleItem",
  components: {VSelect, VAutocomplete},
  props: {
    weekDays: {
      type: Array,
      required: true
    },
    dayType: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    days: {
      type: Array,
      required: true
    },
    types: {
      type: Array,
      required: true
    },
    v: {
      type: Object,
      required: true
    },
    scheduleVuelidate: {
      type: Array,
      required: true
    },
    scheduleRule: {
      type: Object,
      required: true
    },
    indexSchedule: {
      type: Number,
      required: true
    }
  },
  setup(props, {emit}) {
    onMounted(() => {
      emit('update:schedule-vuelidate', [...props.scheduleVuelidate, props.v])
    })

    const modelWeekDays = computed({
      get: () => props.weekDays,
      set: (val) => emit('update:week-days', val)
    })

    const modelDayType = computed({
      get: () => props.dayType,
      set: (val) => emit('update:day-type', val)
    })

    const modelFrom = computed({
      get: () => props.from,
      set: (val) => emit('update:from', val)
    })

    const modelTo = computed({
      get: () => props.to,
      set: (val) => emit('update:to', val)
    })

    updateScheduleVuelidate(props, emit)

    return {
      modelWeekDays,
      modelDayType,
      modelFrom,
      modelTo
    }
  }
}
</script>

<style scoped lang="scss">

</style>
