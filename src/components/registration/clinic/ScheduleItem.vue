<template>
  <div class="registration-clinic__week">
    <div
        class="registration-clinic__week-day"
        :class="{'form-error': v.weekDays.$error}"
    >
      <label>Week day *</label>
      <VAutocomplete
          v-model="v.weekDays.$model"
          :items="item.days"
          item-title="name"
          item-value="name"
          label="Select day of week"
          multiple
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
          v-model="v.dayType.$model"
          :options="item.types"
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
      v-if="item.dayType === 'Workday'"
      class="registration-clinic__time"
  >
    <div
        class="registration-clinic__from"
        :class="{'form-error': v.from.$error}"
    >
      <label>From *</label>
      <input
          v-model="v.from.$model"
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
          v-model="v.to.$model"
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
import {onMounted} from "vue";

export default {
  name: "ScheduleItem",
  components: {VSelect, VAutocomplete},
  props: {
    item: {required: true},
    v: {required: true},
    currentLocationVuelidate: {required: true},
  },
  setup(props) {
    onMounted(() => {
      props.currentLocationVuelidate.push(props.v)
    })
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
