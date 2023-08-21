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
          <template #default>
            <div class="clinic-card__conveniences clinic-conveniences">
              <div
                  v-for="convenience in clinic.conveniences"
                  :key="convenience.id"
                  class="clinic-conveniences__item"
              >
                <i
                    class="clinic-conveniences__icon"
                    :class="getIcon(convenience.id)">
                </i>
                <span>{{ convenience.name }}</span>
              </div>
            </div>
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
            <div class="clinic-card__make-appointment make-appointment">
              <button>Make appointment</button>
            </div>
          </template>
        </clinic-list-item>
      </div>
      <div class="clinic__tabs clinic-tabs">
        <div class="clinic-tabs__box">
          <button class="clinic-tabs__switch-btn tab-active">Info</button>
          <button
              class="clinic-tabs__switch-btn"
              @click="getClinicsWithoutCurrent"
          >
            Clinics
          </button>
          <button class="clinic-tabs__switch-btn">Doctors</button>
          <div class="clinic-tabs__active-line"></div>
        </div>
        <div class="clinic-tabs__content tabs-content">
          <div class="tabs-content__wrapper tabs-content__description content-active">
            <h2>Description</h2>
            <p>
              {{ clinic.description }}
            </p>
          </div>
          <div class="tabs-content__wrapper tabs-content__clinics">
            <h2>Clinics</h2>
            <clinic-list :clinics="clinics">
              <template #listItem="scope">
                <sub-clinic-list-item
                    :path-to-img="scope.pathToImg"
                    :clinic="scope.clinic"
                />
              </template>
            </clinic-list>
          </div>
          <div class="tabs-content__wrapper tabs-content__doctors">
            <h2>Doctors</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto delectus minima officia
              quam, quo vitae voluptatum? Animi assumenda dolore dolorem, esse numquam placeat qui quibusdam reiciendis
              rerum sed, unde.
            </p>
          </div>
        </div>
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
import switchActiveTabHook from "../../hooks/clinic/specific-clinic/switch-active-tab.hook";
import getClinicsWithoutCurrentHook from "../../hooks/clinic/specific-clinic/get-clinics-without-current.hook";
import ClinicList from "../../components/clinic/ClinicList.vue";
import SubClinicListItem from "../../components/clinic/SubClinicListItem.vue";
import getClinicIcon from "../../util/get-clinic-icon";

export default {
  name: "ClinicPage",
  components: {SubClinicListItem, ClinicList, ClinicListItem},
  setup() {
    regMountedStateHook()

    const {clinic, hasClinicInfo, clinics, page, perPage, totalPages} = initStateHook()

    switchActiveTabHook()

    const {getClinicsWithoutCurrent} = getClinicsWithoutCurrentHook(clinic, clinics, page, perPage, totalPages)
    const getIcon = (convenienceId) => getClinicIcon(convenienceId)

    return {
      clinic,
      clinics,
      hasClinicInfo,
      getClinicsWithoutCurrent,
      getIcon
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
@import "src/assets/scss/clinic-sub-card";
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";
@import "src/assets/scss/icons";

.clinic {
  height: 100%;

  &__container {
    max-width: 750px;
    margin: 0 auto;
    padding-top: 30px;
  }

  &__tabs {
    background: $white;
    padding: 20px;
    box-shadow: 2px 2px 15px rgb(128 142 184 / 10%);
    border-radius: 15px;
  }
}

.main-card {
  margin-bottom: 25px;
}

.clinic-tabs {
  &__box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    border-bottom: 2px solid rgb(229, 229, 229);
    position: relative;
  }

  &__active-line {
    position: absolute;
    bottom: -2px;
    left: 73px;
    height: 4px;
    width: 63px;
    border-radius: 10px;
    background: #0fb4a8;
    transition: $transition03;
  }

  &__switch-btn {
    font-size: 18px;
    font-weight: 700;
    color: #919191;
    background: none;
    border: none;
    cursor: pointer;
    padding: 15px;

    &.tab-active {
      color: $darkTeal2;
    }
  }

  &__content {
    padding: 10px;
  }
}

.tabs-content {
  &__wrapper {
    display: none;
    padding-top: 10px;

    & > h2 {
      margin-bottom: 15px;
      font-size: 18px;
      font-weight: 700;
    }

    & > p {
      line-height: 16px;
      font-size: 13px;
    }

    &.content-active {
      display: block;
    }
  }
}
</style>
