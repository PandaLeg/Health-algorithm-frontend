<template>
  <div class="doctors">
    <div class="container">
      <SearchDoctor
          v-model:city="searchDoctorInfo.city"
          v-model:search-city="searchDoctorInfo.searchCity"
          v-model:searched-cities="searchedCities"
          v-model:specialty="searchDoctorInfo.specialty"
          v-model:doctor-name="searchDoctorInfo.doctorName"
          v-model:search-doctor-name="searchDoctorInfo.searchDoctorName"
          v-model:names="names"
          :specialties="specialties"
          :is-doctor-fields-disabled="isDoctorFieldsDisabled"
          @search="search"
      />
      <div class="doctors__count doctors-count">
        <div class="doctors-count__box">
          <div class="total-pages">
            <div class="total-pages__content">
              Found doctors in {{ currentCity }}
              <span class="total-pages__count">( {{ countDoctors }} )</span>
            </div>
          </div>
        </div>
      </div>
      <DoctorList
          :doctors="doctors"
          :per-page="perPage"
          :is-loading="isLoading"
          :static-doctor-info="staticDoctorInfo"
          :slots-days="slotsDays"
          :visit-times="visitTimes"
      />
      <VPagination
          v-if="doctors.length"
          :current-page="currentPage"
          :total-pages="totalPages"
          @next-page="nextPage"
      />
    </div>
  </div>
</template>

<script>
import VPagination from "../../components/custom/VPagination.vue";
import initState from "../../hooks/doctor/doctor-search/init-state.hook";
import DoctorList from "../../components/doctor/DoctorList.vue";
import regMountedState from "../../hooks/reg-mounted-state.hook";
import VAutocomplete from "../../components/custom/VAutocomplete.vue";
import SearchDoctor from "../../components/doctor/SearchDoctor.vue";
import doctorSearchHook from "../../hooks/doctor/doctor-search/doctor-search.hook";

export default {
  name: "DoctorsPage",
  components: {
    SearchDoctor,
    VAutocomplete,
    VPagination,
    DoctorList,
  },
  setup() {
    regMountedState()

    const {
      currentPage, perPage, totalPages, doctors, isLoading, staticDoctorInfo, countDoctors,
      currentCity, slotsDays, visitTimes, searchedCities, searchDoctorInfo, specialties, names,
      isDoctorFieldsDisabled
    } = initState()

    const {
      search,
      nextPage
    } = doctorSearchHook(currentPage, perPage, totalPages, doctors, searchDoctorInfo, currentCity, countDoctors, isLoading)

    return {
      currentPage,
      totalPages,
      perPage,
      doctors,
      isLoading,
      staticDoctorInfo,
      slotsDays,
      visitTimes,
      searchedCities,
      searchDoctorInfo,
      specialties,
      names,
      countDoctors,
      currentCity,
      isDoctorFieldsDisabled,
      nextPage,
      search
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";

.doctors {
  height: 100%;

  &__search {
    padding-top: 30px;
    margin-bottom: 30px;

    @media screen and (max-width: $md2 + px) {
      padding: 30px 20px 0;
    }

    @media screen and (max-width: $md4 + px) {
      padding: 30px 5px 0;
    }
  }

  &__list {
    padding-top: 30px;
  }
}

.search-doctor {
  &__wrapper {
    max-width: 850px;
    margin: 0 auto;
    box-shadow: 2px 2px 15px rgb(128 142 184 / 10%);
    border-radius: 15px;
    padding: 15px;
    background: $white;

    @media screen and (max-width: $md2 + px) {
      max-width: 500px;
    }
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  &__main {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    label {
      display: inline-block;
      margin-bottom: 5px;
    }

    @media screen and (max-width: $md2 + px) {
      flex-wrap: wrap;
      gap: 10px;
    }
  }

  &__city, &__names {
    flex: 0 1 30%;
  }

  &__specialties {
    flex: 0 1 40%;
  }

  @media screen and (max-width: $md2 + px) {
    &__city, &__specialties {
      flex: 0 1 calc(50% - 5px);
    }

    &__names {
      flex: 0 1 100%;
    }
  }

  @media screen and (max-width: $md4 + px) {
    &__city, &__names, &__specialties {
      flex: 0 1 100%;
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
}

.doctors-count {
  &__box {
    max-width: 850px;
    margin: 0 auto 30px;
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
