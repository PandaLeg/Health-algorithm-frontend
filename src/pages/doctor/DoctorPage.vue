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
      <div class="doctor__description doctor-description">
        <div class="doctor-description__wrapper">
          <div class="doctor-description__about">
            <h2>About</h2>
            <p>
              {{ doctor.about }}
            </p>
          </div>
          <div class="doctor-description__education">
            <h2>Education</h2>
            <p>
              {{ doctor.education }}
            </p>
          </div>
          <div class="doctor-description__course">
            <h2>Courses</h2>
            <p>
              {{ doctor.course }}
            </p>
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
    padding-bottom: 30px;

    @media screen and (max-width: $md3 + 'px') {
      max-width: none;
    }
  }

  &__description {
    margin-top: 20px;
    background: $white;
    padding: 20px;
    box-shadow: 2px 2px 15px rgb(128 142 184 / 10%);
    border-radius: 15px;
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
      padding: 0 10px;
    }
  }

  &__clinics {
    padding: 0 20px 20px;

    @media screen and (max-width: $md4 + px) {
      padding: 0 10px 20px;
    }
  }

  &__divider {
    background-color: rgb(229, 229, 229);
    height: 1px;
    margin: 0 20px 20px;
  }
}

.doctor-description {
  &__wrapper {
  }

  &__about, &__education, &__course {
    margin-bottom: 15px;

    & > h2 {
      margin-bottom: 5px;
      font-size: 18px;
      font-weight: 700;
    }

    & > p {
      line-height: 16px;
      font-size: 13px;
    }
  }
}
</style>
