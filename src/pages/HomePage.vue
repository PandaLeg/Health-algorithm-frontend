<template>
  <div class="home">
    <section class="get-started">
      <div class="get-started__container container">
        <div class="get-started__content">
          <div class="get-started__block-text block-text">
            <h1 class="block-text__title">
              Take care of yours family’s
              <span>health.</span>
            </h1>
            <div class="block-text__subtitle">
              All in one destination for health queries. Consult 10,000+ health workers about your concerns.
            </div>
            <a href="#" class="block-text__btn home-button">Get started</a>
          </div>
        </div>
        <div class="get-started__img">
          <img :src="images.mainPatientDoctor" alt="DoctorPatient">
        </div>
        <div class="get-started__video">
          <a href="#" class="video-get-started">
            <div class="video-get-started__icon">
              <img :src="images.mainVideoPlay" alt="PLay">
            </div>
            <div class="video-get-started__body">
              <div class="video-get-started__title">Stay safe with HealthAlgorithm</div>
              <div class="video-get-started__text">Watch Video</div>
            </div>
          </a>
        </div>
      </div>
    </section>
    <section class="experts">
      <div class="experts__container container">
        <div class="experts__statistics statistics-experts">
          <div class="statistics-experts__body body-statistics-experts">
            <div class="body-statistics-experts__item">
              <div class="body-statistics-experts__value">2m</div>
              <div class="body-statistics-experts__text">Users</div>
            </div>
            <div class="body-statistics-experts__item">
              <div class="body-statistics-experts__value">5000+</div>
              <div class="body-statistics-experts__text">Clinics</div>
            </div>
            <div class="body-statistics-experts__item">
              <div class="body-statistics-experts__value">10,000+</div>
              <div class="body-statistics-experts__text">Medical experts</div>
            </div>
          </div>
          <div class="statistics-experts__decor statistics-experts__decor_1"></div>
          <div class="statistics-experts__decor statistics-experts__decor_2"></div>
          <div class="statistics-experts__decor statistics-experts__decor_3"></div>
        </div>
        <div class="experts__body">
          <div class="experts__content">
            <div class="experts__block-text block-text">
              <h1 class="block-text__title">
                Talk to
                <span>experts.</span>
              </h1>
              <div class="block-text__subtitle">
                Choose the doctor you need, make appointments, perform preventive health care, take courses of treatment
                and stay healthy.
              </div>
              <a href="#" class="block-text__btn home-button">Features</a>
            </div>
          </div>
          <div class="experts__video">
            <iframe src="https://www.youtube.com/embed/RgKAFK5djSk" title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </section>
    <section class="healthcare">
      <div class="healthcare__container container">
        <div class="healthcare__block-text block-text block-text_center">
          <h1 class="block-text__title">
            <span>Healthcare</span>
            at your Fingertips.
          </h1>
          <div class="block-text__subtitle block-text__subtitle_mw">
            Bringing premium healthcare features to your fingertips. User friendly platform to bring healthcare
            to your fingertips. Signup and be a part of the new health culture.
          </div>
        </div>
        <div class="healthcare__items">
          <div class="healthcare__column healthcare__column_1">
            <div class="healthcare__item item-healthcare">
              <div class="item-healthcare__icon">
                <img :src="images.mainPatient" alt="patient">
              </div>
              <div class="item-healthcare__title">Health card</div>
              <div class="item-healthcare__subtitle">
                Your personal health card no longer needs to be carried around.
                View and make changes remotely.
              </div>
            </div>
          </div>
          <div class="healthcare__column healthcare__column_2">
            <div class="healthcare__item item-healthcare">
              <div class="item-healthcare__icon">
                <img :src="images.mainDoctor" alt="patient">
              </div>
              <div class="item-healthcare__title">24x7 Medical support</div>
              <div class="item-healthcare__subtitle">Consult with 10,000+ health workers about your concerns.</div>
            </div>
          </div>
          <div class="healthcare__column healthcare__column_3">
            <div class="healthcare__item item-healthcare">
              <div class="item-healthcare__icon">
                <img :src="images.mainHeart" alt="patient">
              </div>
              <div class="item-healthcare__title">Conditions</div>
              <div class="item-healthcare__subtitle">Bringing premium healthcare features to your fingertips.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import regMountedState from "../hooks/reg-mounted-state.hook";
import {computed} from "vue";

export default {
  name: "HomePage",
  setup() {
    regMountedState()

    const images = computed(() => {
      return {
        mainPatientDoctor: require('../assets/images/main/main-patient-doctor.svg'),
        mainVideoPlay: require('../assets/images/main/main-video-play.svg'),
        mainDoctor: require('../assets/images/main/main-doctor.svg'),
        mainPatient: require('../assets/images/main/main-patient.svg'),
        mainHeart: require('../assets/images/main/main-heart.svg'),
      }
    })

    return {images}
  },
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";

.home {
  height: 100%;
  overflow: hidden;
}

.home-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  @include main-btn($burgundyLighten, $LightenBlue2);

  &::before {
    @extend %after-effect-btn;
  }

  &:hover::before {
    opacity: 1;
  }
}

/* Get started section */

.get-started {
  background-color: $white;

  &__container {
    display: flex;
    flex-wrap: wrap;
    padding: 150px 15px 50px;

    @media screen and (max-width: $md3 + px) {
      padding: 50px 15px 30px;
    }
  }

  &__content {
    flex: 0 1 48%;
    padding: 0 20px 0 0;

    @media screen and (max-width: $md3 + px) {
      flex: 1 1 100%;
      padding: 0;
    }
  }

  &__img {
    flex: 0 1 52%;

    img {
      max-width: 100%;
    }

    @media screen and (max-width: $md3 + px) {
      flex: 1 1 100%;
      text-align: center;
      padding: 30px 0;
    }
  }

  &__block-text {
    max-width: 500px;

    @media screen and (max-width: $md3 + px) {
      max-width: none;
    }
  }

  &__video {
    flex: 1 1 100%;
    padding: 60px 0 0 0;

    @media screen and (max-width: $md3 + px) {
      padding: 0;
    }
  }
}

.video-get-started {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &__body {
    padding: 0 0 0 12px;
  }

  &__icon {
    flex: 0 0 44px;
  }

  &__title {
    color: $grayLighten3;
    font-size: 13px;
    font-weight: 400;
    line-height: 126%;
    letter-spacing: 1.04px;
    margin-bottom: 5px;
  }

  &__text {
    color: #000;
    font-size: 9px;
    font-weight: 400;
    line-height: 126%;
    letter-spacing: 1.485px;
    text-transform: uppercase;
  }
}

.block-text {
  &__title {
    font-size: 44px;
    font-weight: 700;
    line-height: 126%;
    margin-bottom: 12px;

    span {
      color: $burgundyLighten;
    }

    @media screen and (max-width: $md3 + px) {
      font-size: 34px;
    }
  }

  &_center {
    text-align: center;
  }

  &__subtitle {
    color: $grayDarken2;
    font-size: 12px;
    font-weight: 500;
    line-height: 138.5%;
    letter-spacing: 0.96px;

    &:not(:last-child) {
      margin-bottom: 24px;
    }

    &_mw {
      max-width: 650px;
      margin: 0 auto;
    }
  }
}

/* Experts section */
.experts {

  &__container {
    padding: 103px 15px 116px;

    @media screen and (max-width: $md3 + px) {
      padding: 70px 15px 60px;
    }
  }

  &__body {
    display: flex;
    align-items: center;

    @media screen and (max-width: $md3 + px) {
      flex-direction: column;
      align-items: stretch;
    }

  }

  &__block-text {
    max-width: 500px;
  }

  &__content {
    flex: 0 1 50%;
    padding: 0 20px 0 0;

    @media screen and (max-width: $md3 + px) {
      padding: 0;
      margin: 0 0 30px 0;
    }
  }

  &__video {
    flex: 0 1 50%;
    padding: 0 0 30% 0;
    position: relative;
    background: $white;
    box-shadow: 0 4px 18px 0 rgba(88, 126, 236, 0.18);

    & iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }

    @media screen and (max-width: $md3 + px) {
      padding: 0 0 58% 0;
    }
  }
}

.statistics-experts {
  max-width: 654px;
  margin: 0 auto 80px;
  position: relative;

  &__body {
    background-color: $white;
    border-radius: 16px;
    box-shadow: 0 2px 24px 0 rgba(88, 126, 236, 0.15);
    position: relative;
    z-index: 2;
  }

  &__decor {
    position: absolute;
    background-color: $burgundyLighten;
    border-radius: 30px;

    &_1 {
      width: 65px;
      height: 65px;
      bottom: -21px;
      left: -21px;
      transform: rotate(-30deg);
      border-radius: 16px;
    }

    &_2 {
      width: 97px;
      height: 97px;
      top: -45px;
      right: 50%;
      transform: rotate(105deg);
    }

    &_3 {
      width: 127px;
      height: 127px;
      right: -55px;
      top: 0;
      transform: rotate(-30deg);
    }
  }

  @media screen and (max-width: $md3 + px) {
    margin: 0 auto 50px;
  }
}

.body-statistics-experts {
  padding: 28px 80px;
  display: flex;
  align-items: center;

  &__item {
    flex: 1 1 auto;
    text-align: center;
  }

  &__value {
    font-size: 36px;
    font-weight: 700;
    color: $burgundyLighten;
    letter-spacing: 4.04px;
    margin-bottom: 5px;
    line-height: 1.2;
  }

  &__text {
    font-size: 11px;
    font-weight: 700;
    color: #000;
    text-transform: uppercase;
    line-height: 1.3;
  }

  @media screen and (max-width: $md3 + px) {
    padding: 28px 20px;
  }

  @media screen and (max-width: $md4 + px) {
    flex-direction: column;

    &__item:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}

/* Healthcare section */

.healthcare {
  background-color: $white;

  &__container {
    padding: 80px 15px 70px;
  }

  &__block-text {
    margin: 0 0 45px 0;
  }

  &__items {
    display: flex;
    justify-content: center;

    @media screen and (max-width: $md3 + px) {
      flex-direction: column;
    }
  }

  &__column {
    flex: 0 1 33.333%;
    padding: 0 36px;
    position: relative;

    &_1::before, &_1::after, &_2::after, &_3::after {
      content: "";
      position: absolute;
      background-color: $burgundyLighten;
    }

    &_1::before {
      width: 65px;
      height: 65px;
      bottom: -35px;
      left: 20px;
      border-radius: 16px;
      transform: rotate(-30deg);
    }

    &_1::after {
      width: 97px;
      height: 97px;
      top: 31px;
      right: -10px;
      border-radius: 30px;
      transform: rotate(105deg);
    }

    &_2::after {
      width: 127px;
      height: 127px;
      bottom: -30px;
      right: -40px;
      border-radius: 30px;
      transform: rotate(-30deg);
    }

    &_3::after {
      width: 65px;
      height: 65px;
      top: -35px;
      right: 15px;
      transform: rotate(-30deg);
      border-radius: 16px;
    }

    @media screen and (max-width: $md2 + px) {
      padding: 0 10px;
    }

    @media screen and (max-width: $md3 + px) {
      &:not(:last-child) {
        margin: 0 0 15px 0;
      }
    }
  }
}

.item-healthcare {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 35px 17px;
  box-shadow: 0 4px 18px 0 rgba(88, 126, 236, 0.18);
  text-align: center;
  background-color: $white;
  border-radius: 8px;
  position: relative;
  z-index: 2;

  &__icon {
    margin: 0 0 58px 0;

    img {
      max-width: 100%;
    }

    @media screen and (max-width: $md3 + px) {
      margin: 0 0 35px 0;
    }
  }

  &__title {
    color: #000;
    font-size: 16px;
    font-weight: 700;
    line-height: 138.5%;
    letter-spacing: 1.28px;
    margin: 0 0 4px 0;
  }

  &__subtitle {
    color: $grayDarken2;
    font-size: 12px;
    font-weight: 400;
    line-height: 138.5%;
    letter-spacing: 0.96px;
  }

  @media screen and (max-width: $md3 + px) {
    padding: 25px 17px;
  }
}
</style>
