<template>
  <div class="registration__week registration-week">
    <div
        class="registration-week__day"
        :class="{'form-error': v.weekDay.$error}"
    >
      <label>Week day *</label>
      <VAutocomplete
          v-model="modelWeekDay"
          :items="days"
          item-title="name"
          item-value="id"
          label="Select day of week"
          same
      />
      <div
          v-for="error in v.weekDay.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
    <div
        class="registration-week__duration"
        :class="{'form-error': v.duration.$error}"
    >
      <label>Duration of appointment *</label>
      <input
          v-model="modelDuration"
          v-maska
          data-maska="##:##"
          placeholder="hh:mm"
          required
      />
      <div
          v-for="error in v.duration.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
  </div>
  <div
      v-if="modelWeekDay"
      class="registration-week__clinic-schedule"
  >
    The clinic is open from
    <span>{{ clinicSchedule.from?.substring(0, 5) ?? '' }}</span>
    to
    <span>{{ clinicSchedule.to?.substring(0, 5) ?? '' }}</span>
  </div>
  <div class="registration-week__time">
    <div
        class="registration-week__from"
        :class="{'form-error': v.from.$error}"
    >
      <label>From *</label>
      <input
          v-model="modelFrom"
          placeholder="Select from time"
          type="time"
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
import {computed, onMounted, ref} from "vue";
import {vMaska} from "maska";
import {updateScheduleVuelidate, watchAndUpdateScheduleRule} from "../../../hooks/registration/watch-location.hook";

export default {
  name: "DoctorScheduleItem",
  components: {VSelect, VAutocomplete},
  directives: {maska: vMaska},
  props: {
    weekDay: {
      required: true,
      validator: (val) => typeof val === 'number' || typeof val === 'string' || val === null
    },
    duration: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true},
    days: {
      type: Array,
      required: true
    },
    clinicBranches: {
      type: Array,
      required: true
    },
    addressBranchId: {
      validator: (val) => typeof val === 'string' || val === null,
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
    const clinicSchedule = ref('')
    onMounted(() => {
      let isExistsV = props.scheduleVuelidate[props.indexSchedule - 1]

      if (!isExistsV) {
        emit('update:schedule-vuelidate', [...props.scheduleVuelidate, props.v])
      } else {
        const newScheduleVuelidate = [...props.scheduleVuelidate].splice(props.indexSchedule - 1, 1, props.v)
        emit('update:schedule-vuelidate', [...newScheduleVuelidate])
      }
    })

    const modelWeekDay = computed({
      get: () => props.weekDay,
      set: (val) => emit('update:week-day', val)
    })

    const modelDuration = computed({
      get: () => props.duration,
      set: (val) => emit('update:duration', val)
    })

    const modelFrom = computed({
      get: () => props.from,
      set: (val) => emit('update:from', val)
    })

    const modelTo = computed({
      get: () => props.to,
      set: (val) => emit('update:to', val)
    })

    if (modelWeekDay.value) {
      const currentBranch = props.clinicBranches.find(branch => branch.id === props.addressBranchId)

      const schedule = currentBranch.schedule.find(sh => sh.weekDayId === modelWeekDay.value)

      if (schedule) {
        clinicSchedule.value = schedule
      }
    }

    updateScheduleVuelidate(props, emit, true)
    watchAndUpdateScheduleRule(modelWeekDay, props, clinicSchedule, emit)

    return {
      modelWeekDay,
      modelDuration,
      modelFrom,
      modelTo,
      clinicSchedule
    }
  }
}
</script>

<style scoped lang="scss">

</style>
