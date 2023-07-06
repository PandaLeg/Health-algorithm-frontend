<template>
  <div
      class="registration-clinic__city"
      :class="{'form-error': v.city.$error}"
  >
    <label>City *</label>
    <VAutocomplete
        v-model="v.city.$model"
        v-model:search="item.searchCity"
        :items="item.cities"
        item-title="name"
        item-value="name"
        label="Write the name of city"
        dynamic
    />
    <div
        v-for="error in v.city.$errors"
        :key="error.$uid"
        class="input-error"
    >
      {{ error.$message }}
    </div>
  </div>
  <div
      v-if="v.city.$model"
      class="registration-clinic__address"
      :class="{'form-error': v.address.$error}"
  >
    <label>Address *</label>
    <input
        v-model="v.address.$model"
        placeholder="Enter address"
        required
    >
    <div
        v-for="error in v.address.$errors"
        :key="error.$uid"
        class="input-error"
    >
      {{ error.$message }}
    </div>
  </div>
</template>

<script>
import VAutocomplete from "../../custom/VAutocomplete.vue";
import {watchAndGetCities} from "../../../hooks/registration/doctor/get-cities-clinic.hook";
import {onMounted} from "vue";

export default {
  name: "LocationItem",
  components: {VAutocomplete},
  props: {
    item: {required: true},
    locationVuelidate: {default: false},
    v: {required: true},
    index: {required: true},
  },
  setup(props) {
    watchAndGetCities(props)

    onMounted(() => {
      props.locationVuelidate.push(props.v)
    })
  },
}
</script>

<style scoped lang="scss">
</style>
