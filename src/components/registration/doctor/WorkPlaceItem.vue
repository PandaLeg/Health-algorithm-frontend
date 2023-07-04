<template>
  <div
      class="registration-doctor__clinic-city"
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
      v-if="item.city"
      class="registration-doctor__clinic-name"
      :class="{'form-error': v.name.$error}"
  >
    <label>Clinic *</label>
    <VAutocomplete
        v-model="v.name.$model"
        v-model:search="item.searchClinic"
        :items="item.clinics"
        item-title="name"
        item-value="clinicId"
        label="Write the name of clinic"
        dynamic
    />
    <div
        v-for="error in v.name.$errors"
        :key="error.$uid"
        class="input-error"
    >
      {{ error.$message }}
    </div>
  </div>
  <div
      v-if="item.city && item.name && item.addresses.length"
      class="registration-doctor__clinic-address"
      :class="{'form-error': v.address.$error}"
  >
    <label>Address *</label>
    <VSelect
        v-model="v.address.$model"
        :options="item.addresses"
        item-title="address"
        item-value="id"
        label="Select address"
    />
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
import getCitiesClinicHook from "../../../hooks/registration/doctor/get-cities-clinic.hook";
import {onMounted} from "vue";
import VSelect from "../../custom/VSelect.vue";

export default {
  name: "WorkPlaceForm",
  components: {VSelect, VAutocomplete},
  props: {
    item: {required: true},
    index: {required: true},
    v: {required: true},
    workPlaceVuelidate: {default: false},
  },
  setup(props, {emit}) {
    getCitiesClinicHook(props, emit)
    onMounted(() => {
      props.workPlaceVuelidate.push(props.v)
    })
  },
}
</script>

<style scoped lang="scss">
.registration-doctor {
  &__clinic-city, &__clinic-name, &__clinic-address {
    margin-bottom: 15px;
  }
}
</style>
