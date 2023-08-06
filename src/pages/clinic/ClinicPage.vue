<template>
  <div class="clinic">
    <div class="clinic__container container">
      <div
          v-if="hasClinicInfo"
          class="clinic__main-card main-card clinic-card"
      >
        <clinic-list-item
            :clinic="clinic"
            :path-to-img="pathToImg"
        >
          <div class="clinic-card__schedule clinic-schedule">
            <div
                v-for="schedule in clinic.schedule"
                :key="schedule.id"
                class="clinic-schedule__item"
            >
              <span>{{ schedule.addressInfo }};</span>
            </div>
          </div>
          <div class="clinic-card__address">
            <span>{{ clinic.address }}</span>
          </div>
          <div class="clinic-card__make-appointment">
            <button>Make appointment</button>
          </div>
        </clinic-list-item>
      </div>
      <div class="clinic__info clinic-info">

      </div>
    </div>
  </div>
</template>

<script>
import regMountedStateHook from "../../hooks/reg-mounted-state.hook";
import {config} from "../../util/config";
import ClinicListItem from "../../components/clinic/ClinicListItem.vue";
import initStateHook from "../../hooks/clinic/specific-clinic/init-state.hook";
import routesNames from "../../router/routesNames";

export default {
  name: "ClinicPage",
  components: {ClinicListItem},
  setup() {
    regMountedStateHook()

    const {clinic, hasClinicInfo} = initStateHook()

    return {
      clinic,
      hasClinicInfo
    }
  },
  computed: {
    routesNames() {
      return routesNames
    },
    pathToImg() {
      return config.apiUrl + '/'
    },
  }
}
</script>

<style lang="scss">
@import "src/assets/scss/clinic-card";
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";

%location-text {
  line-height: 16px;
  color: #707272;
  font-size: 13px;
  font-weight: 500;
}

.clinic {
  height: 100%;

  &__container {
    max-width: 750px;
    margin: 0 auto;
    padding-top: 30px;
  }
}

.main-card {
  margin-bottom: 25px;
}

.clinic-card {
  &__address {
    margin-bottom: 10px;
    text-align: end;
    @extend %location-text;
    word-break: break-word;
  }

  &__make-appointment {
    text-align: end;
    margin-bottom: 5px;

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

.clinic-schedule {
  margin-bottom: 5px;

  &__item {
    display: inline-block;
    @extend %location-text;

    &:not(:last-child) {
      margin-right: 5px;
    }
  }
}
</style>
