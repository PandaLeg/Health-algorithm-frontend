<template>
  <div class="doctor">
    <div class="doctor__container container">
      <div class="doctor__card doctor-card">
        <div class="doctor-card__wrapper-layout">
          <div class="doctor-card__info">
            <div class="doctor-card__avatar">
              <img :src="doctor.avatar ? pathToImg + doctor.avatar : defaultAvatar" alt="Not found">
            </div>
            <div class="doctor-card__inner">
              <div class="doctor-card__main">
                <div class="doctor-card__full-name">
                  <span>{{ doctor.firstName }} {{ doctor.lastName }} </span>
                </div>
                <div class="doctor-card__specialties specialties-list">
                    <span
                        v-for="specialty in doctor.specialties"
                        :key="specialty.id"
                        class="specialties-list__item"
                    >
                      {{ specialty?.name ?? '' }}
                    </span>
                </div>
                <div class="doctor-card__category">
                  <span>{{ doctor.categoryName }}</span>
                </div>
              </div>
              <div class="doctor-card__experience experience">
                <span class="experience__number">{{ doctor.experience }}</span>
                <span class="experience__text">experience</span>
              </div>
              <div class="doctor-card__description">
                <p>
                  {{ doctor.about }}
                </p>
              </div>
              <div class="doctor-card__price">
                <span>250$</span>
              </div>
              <div class="doctor-card__make-appointment make-appointment">
                <button>Make appointment</button>
              </div>
            </div>
          </div>
          <div class="doctor-card__divider"></div>
          <div class="doctor-card__clinics">
            <clinic-list :clinics="clinics">
              <template #listItem="scope">
                <sub-clinic-list-item
                    :path-to-img="scope.pathToImg"
                    :clinic="scope.clinic"
                />
              </template>
            </clinic-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routes from "../../router/routesNames";
import regMountedStateHook from "../../hooks/reg-mounted-state.hook";
import SubClinicListItem from "../../components/clinic/SubClinicListItem.vue";
import {config} from "../../util/config";
import ClinicList from "../../components/clinic/ClinicList.vue";
import initStateHook from "../../hooks/doctor/specific-doctor/init-state.hook";
import {computed} from "vue";

export default {
  name: "DoctorPage",
  components: {ClinicList, SubClinicListItem},
  setup() {
    regMountedStateHook()

    const {doctor, clinics} = initStateHook()
    const routesNames = computed(() => routes)
    const defaultAvatar = computed(() => require('../.././assets/images/doctor.webp'))
    const pathToImg = computed(() => config.apiUrl + '/')

    return {
      doctor,
      clinics,
      routesNames,
      defaultAvatar,
      pathToImg
    }
  },
}
</script>


<style lang="scss">
@import "src/assets/scss/doctor-card";
@import "src/assets/scss/icons";
@import "src/assets/scss/clinic-card";
@import "src/assets/scss/clinic-sub-card";
@import "src/assets/scss/ui";

%location-text {
  line-height: 16px;
  color: #707272;
  font-size: 13px;
  font-weight: 500;
}

.doctor {
  height: 100%;

  &__container {
    max-width: 750px;
    margin: 0 auto;
    padding-top: 30px;
  }
}

.doctor-card {
  &__wrapper-layout {
    padding-top: 20px;
  }

  &__info {
    display: flex;
    position: relative;

    @media screen and (max-width: $md4 + px) {
      flex-direction: column;
      padding: 0 15px;
    }
  }

  &__clinics {
    padding: 0 20px 20px;
  }

  &__divider {
    background-color: rgb(229, 229, 229);
    height: 1px;
    margin: 0 20px 20px;
  }
}
</style>
