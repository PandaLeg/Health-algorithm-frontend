<template>
  <div class="registration-clinic__week">
    <div
        class="registration-clinic__week-day"
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
        class="registration-clinic__day-type"
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
      class="registration-clinic__time"
  >
    <div
        class="registration-clinic__from"
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
        class="registration-clinic__to"
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

export default {
  name: "ScheduleItem",
  components: {VSelect, VAutocomplete},
  props: {
    weekDays: {required: true},
    dayType: {required: true},
    from: {required: true},
    to: {required: true},
    days: {required: true},
    types: {required: true},
    v: {required: true},
    currentLocationVuelidate: {required: true},
  },
  setup(props, {emit}) {
    onMounted(() => {
      emit('update:current-location-vuelidate', [...props.currentLocationVuelidate, props.v])
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
.registration-clinic {
  &__week, &__time {
    display: flex;
    gap: 15px;
  }

  &__week-day, &__day-type, &__from, &__to {
    flex: 0 1 50%;
  }

  &__week, &__time:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
