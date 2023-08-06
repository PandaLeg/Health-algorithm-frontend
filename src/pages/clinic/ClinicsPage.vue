<template>
  <div class="clinics">
    <div class="container">
      <div class="clinics__search search-clinic">
        <div class="search-clinic__wrapper">
          <div class="search-clinic__title">
            <h2>Search clinic</h2>
          </div>
          <div class="search-clinic__main">
            <div
                class="search-clinic__city"
                :class="{'form-error': v$.city.$error}"
            >
              <label>City</label>
              <VAutocomplete
                  v-model="clinicInfo.city"
                  v-model:search="clinicInfo.searchCity"
                  :items="clinicInfo.cities"
                  item-title="name"
                  item-value="name"
                  label="Write the name of city"
                  dynamic
              />
              <div
                  v-for="error in v$.city.$errors"
                  :key="error.$uid"
                  class="input-error"
              >
                {{ error.$message }}
              </div>
            </div>
            <div class="search-clinic__name">
              <label>Clinic</label>
              <VAutocomplete
                  v-model="clinicInfo.clinic"
                  v-model:search="clinicInfo.searchClinic"
                  :items="clinicInfo.clinics"
                  :disabled="isClinicDisabled"
                  item-title="name"
                  item-value="clinicId"
                  label="Write the name of clinic"
                  dynamic
              />
            </div>
          </div>
          <div class="search-clinic__action">
            <button @click="search">Search</button>
          </div>
        </div>
      </div>
      <ClinicList :clinics="clinics"/>
      <VPagination
          v-if="clinics.length > 0 && totalPages > 1"
          :current-page="page"
          :total-pages="totalPages"
          @next-page="nextPage"
      />
    </div>
  </div>
</template>

<script>
import ClinicList from "../../components/clinic/ClinicList.vue";
import regMountedStateHook from "../../hooks/reg-mounted-state.hook";
import initStateHook from "../../hooks/clinic/clinic-search/init-state.hook";
import getClinicsHook from "../../hooks/clinic/clinic-search/get-clinics.hook";
import VPagination from "../../components/custom/VPagination.vue";
import VAutocomplete from "../../components/custom/VAutocomplete.vue";
import {watchAndGetCities, watchAndGetClinics} from "../../hooks/registration/get-cities-clinic.hook";
import {useVuelidate} from "@vuelidate/core";
import searchClinicsHook from "../../hooks/clinic/clinic-search/search-clinics.hook";

export default {
  name: "ClinicsPage",
  components: {
    VAutocomplete,
    VPagination,
    ClinicList
  },
  setup() {
    regMountedStateHook()

    const {clinics, page, perPage, totalPages, clinicInfo, isClinicDisabled, cityRule} = initStateHook()
    const v$ = useVuelidate(cityRule, clinicInfo)

    const {nextPage, getClinic, getClinics} = getClinicsHook(clinics, page, perPage, totalPages, clinicInfo)
    const {search} = searchClinicsHook(v$, clinicInfo, getClinic, getClinics)

    watchAndGetCities(clinicInfo)
    watchAndGetClinics(clinicInfo)


    return {
      clinics,
      page,
      totalPages,
      clinicInfo,
      isClinicDisabled,
      v$,
      nextPage,
      search
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";

.clinics {
  height: 100%;

  &__search {
    padding-top: 30px;
  }
}

.search-clinic {
  &__wrapper {
    max-width: 750px;
    margin: 0 auto;
    box-shadow: 2px 2px 15px rgb(128 142 184 / 10%);
    border-radius: 15px;
    padding: 15px;
    background: $white;
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  &__main {
    display: flex;
    gap: 40px;
    margin-bottom: 20px;

    label {
      display: inline-block;
      margin-bottom: 5px;
    }
  }

  &__action {
    text-align: end;

    button {
      @include main-btn($burgundyLighten, $LightenBlue2);

      &::before {
        @extend %after-effect-btn;
      }

      &:hover::before {
        opacity: 1;
      }
    }
  }

  &__city, &__name {
    flex: 0 1 50%;
  }
}

input {
  @extend %field-reg;
}

label {
  @extend %label-reg;
}

.input-error {
  @extend %input-error;
}

.form-error {
  input, select {
    @extend %form-error;
  }
}
</style>
