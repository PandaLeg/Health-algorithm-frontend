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
            <a href="#" class="block-text__btn home-button">GET STARTED</a>
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
  </div>
</template>

<script>
import regMountedState from "../hooks/reg-mounted-state.hook";

export default {
  name: "HomePage",
  setup() {
    regMountedState()
  },
  computed: {
    images() {
      return {
        mainPatientDoctor: require('../assets/images/main-patient-doctor.svg'),
        mainVideoPlay: require('../assets/images/main-video-play.svg'),
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.home {
  height: 100%;
}

.home-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 13px 30px;
  background-color: $burgundyLighten;
  color: $LightenBlue2;
  font-family: "MyRoboto", sans-serif;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 1.4px;
  border-radius: 5px;
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

  &__subtitle {
    color: $grayDarken2;
    font-size: 12px;
    font-weight: 500;
    line-height: 138.5%;
    letter-spacing: 0.96px;

    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
}

/* Experts section */
.experts {

  &__container {
    padding: 103px 15px 116px;

    @media screen and (max-width: $md3 + px) {
      padding: 103px 15px 60px;
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
</style>
