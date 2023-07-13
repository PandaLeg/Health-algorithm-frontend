<template>
  <div class="registration-page">
    <div class="container">
      <div class="registration-page__body">
        <div class="registration-page__title">
          <h1>Doctor / Patient Registration</h1>
        </div>
        <div class="registration-page__subtitle">
          <p>Hover or click on the card to go to the registration of the selected user type</p>
        </div>
        <div class="registration-page__cards">
          <div class="card-registration">
            <div class="card-registration__front">
              <img
                  :src="images.doctor"
                  alt="Photo"
              >
            </div>
            <div class="card-registration__back">
              <div class="card-registration__icon ">
                <span aria-label="Doctor-icon" class="_icon-doctor"></span>
              </div>
              <div class="card-registration__content">
                <router-link
                    :to="{name: routesNames.registrationDoctor.name}"
                    class="card-registration__link"
                >
                  <h1>Doctor</h1>
                </router-link>
                <span>Registration</span>
              </div>
            </div>
          </div>

          <div class="card-registration">
            <div class="card-registration__front">
              <img
                  :src="images.patient"
                  alt="Photo"
              >
            </div>
            <div class="card-registration__back">
              <div class="card-registration__content">
                <router-link
                    :to="{name: routesNames.registrationPatient.name}"
                    class="card-registration__link"
                >
                  <h1>Patient</h1>
                </router-link>
                <span>Registration</span>
              </div>
            </div>
          </div>

          <div class="card-registration">
            <div class="card-registration__front">
              <img
                  :src="images.patient"
                  alt="Photo"
              >
            </div>
            <div class="card-registration__back">
              <div class="card-registration__content">
                <router-link
                    :to="{name: routesNames.registrationClinic.name}"
                    class="card-registration__link"
                >
                  <h1>Clinic</h1>
                </router-link>
                <span>Registration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routesNames from "../../router/routesNames";
import regMountedState from "../../hooks/reg-mounted-state.hook";

export default {
  name: "RegistrationPage",
  setup() {
    regMountedState()
  },
  computed: {
    routesNames() {
      return routesNames
    },
    images() {
      return {
        doctor: require('../../assets/images/doctor.webp'),
        patient: require('../../assets/images/patient.webp'),
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/icons";

.registration-page {
  padding: 40px 20px;
  height: 100%;

  &__body {
    max-width: 800px;
    padding: 0 20px;
    margin: 0 auto;
  }

  &__title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 10px;
    display: block;
  }

  &__subtitle {
    font-size: 18px;
    text-align: center;
    margin-bottom: 30px;
  }

  &__cards {
    display: flex;
    gap: 20px;
  }
}

.card-registration {
  height: 400px;
  cursor: pointer;
  position: relative;
  flex: 1;

  &:hover {
    .card-registration__front {
      transform: perspective(600px) rotateY(-180deg);
    }

    .card-registration__back {
      transform: perspective(600px) rotateY(0);
    }
  }

  &__front, &__back {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transition: transform .5s ease;
    border-radius: 10px;
    background: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
  }

  &__front {
    transform: perspective(600px) rotateY(0);

    img {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__back {
    transform: perspective(600px) rotateY(180deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    h1 {
      color: #444;
      font-size: 24px;
    }

    span {
      display: block;
      font-size: 18px;
      font-weight: 300;
      margin: 5px 0 10px;
    }
  }

  &__link {
    h1 {
      color: #fff;
    }
  }

  &__icon {
    color: #fff;
  }
}
</style>
