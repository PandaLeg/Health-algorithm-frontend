<template>
  <div class="clinics">
    <div class="container">
      <SearchClinic
          v-model:city="clinicInfo.city"
          v-model:clinic="clinicInfo.clinic"
          v-model:search-city="clinicInfo.searchCity"
          v-model:search-clinic="clinicInfo.searchClinic"
          v-model:searched-cities="searchedCities"
          v-model:searched-clinics="searchedClinics"
          :is-clinic-disabled="isClinicDisabled"
          :v$="v$"
          @search="search"
      />

      <ClinicList :clinics="clinics">
        <template #listItem="scope">
          <ClinicListItem
              :clinic="scope.clinic"
              :path-to-img="scope.pathToImg"
          />
        </template>
      </ClinicList>

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
import ClinicListItem from "../../components/clinic/ClinicListItem.vue";
import {config} from "../../util/config";
import SearchClinic from "../../components/clinic/SearchClinic.vue";

export default {
  name: "ClinicsPage",
  components: {
    SearchClinic,
    ClinicListItem,
    VAutocomplete,
    VPagination,
    ClinicList
  },
  setup() {
    regMountedStateHook()

    const {
      clinics,
      page,
      perPage,
      totalPages,
      clinicInfo,
      searchedCities,
      searchedClinics,
      isClinicDisabled,
      cityRule
    } = initStateHook()
    const v$ = useVuelidate(cityRule, clinicInfo)

    const {nextPage, getClinic, getClinics} = getClinicsHook(clinics, page, perPage, totalPages, clinicInfo)
    const {search} = searchClinicsHook(v$, clinicInfo, getClinic, getClinics)

    return {
      clinics,
      page,
      totalPages,
      clinicInfo,
      searchedCities,
      searchedClinics,
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
@import "src/assets/scss/clinic-card";

.clinics {
  height: 100%;

  &__search {
    padding-top: 30px;
    margin-bottom: 30px;
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
