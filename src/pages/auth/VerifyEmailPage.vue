<template>
  <div class="verify-email">
    <div class="container verify-email__container">
      <div
          v-if="!activationTokenError"
          class="verify-email__content content-success"
      >
        <div class="content-success__item">
          <div class="content-success__block">
            <h2 class="content-success__title">Great! Email has been verified!</h2>
            <p class="content-success__subtitle">Thank you</p>
            <router-link
                :to="{name: routesNames.login.name}"
                class="content-success__link"
            >
              Login
            </router-link>
          </div>
        </div>
        <div class="content-success__item">
          <div class="content-success__img">
            <img :src="images.verifiedEmail" alt="Not Found">
          </div>
        </div>
      </div>
      <div
          v-else
          class="verify-email__content content-failure"
      >
        <div class="content-failure__block">
          <h2 class="content-failure__title">Please verify your email</h2>
          <div class="content-failure__text">
            <p>
              If you landed on this page, either the user is already activated or the token has expired.
              Please click "Resend Verification Email", to send the activation email again
            </p>
            <p>
              Then follow the instructions in the letter. If you didn't receive the email, please check
              your Spam folder
            </p>
          </div>
          <div
              class="content-failure__resend"
              @click="sendConfirmation"
          >
            <button>Resend Verification Email</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routesNames from "../../router/routesNames";
import initState from "../../hooks/auth/verify-email/init-state.hook";
import checkParams from "../../hooks/auth/verify-email/check-params.hook";
import sendConfirmationEmail from "../../hooks/auth/verify-email/send-confirmation-email.hook";
import regMountedState from "../../hooks/reg-mounted-state.hook";

export default {
  name: "VerifyEmail",
  setup() {
    const {activationTokenError, email} = initState()

    checkParams(activationTokenError, email)

    const {sendConfirmation} = sendConfirmationEmail(email)

    regMountedState()

    return {
      activationTokenError,
      sendConfirmation
    }
  },
  computed: {
    routesNames() {
      return routesNames
    },
    images() {
      return {
        verifiedEmail: require('../../assets/images/verified-email.webp')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.verify-email {
  height: 100%;

  &__container, &__content {
    height: inherit;
  }

  &__container {
    @media screen and (max-width: $md4 + px) {
      padding: 0;
    }
  }
}

.content-success {
  display: flex;

  @media screen and (max-width: $md2 + px) {
    flex-direction: column;
    text-align: center;
  }

  &__item {
    flex: 0 1 50%;

    &:first-child {
      align-self: center;
    }

    @media screen and (max-width: $md2 + px) {
      &:first-child {
        order: 1;
      }
      &:last-child {
        order: -1;
      }
    }
  }

  &__block {
    @media screen and (max-width: $md2 + px) {
      padding: 20px;
    }

    @media screen and (max-width: $md4 + px) {
      padding: 15px 15px 40px;
    }
  }

  &__title {
    font-size: 40px;
    font-weight: 700;

    @media screen and (max-width: $md4 + px) {
      font-size: 30px;
    }
  }

  &__subtitle {
    font-size: 20px;
    margin-top: 15px;
  }

  &__img {
    height: 100%;
    position: relative;

    img {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    @media screen and (max-width: $md2 + px) {
      height: auto;
      padding: 0 0 60% 0;
    }

    @media screen and (max-width: $md4 + px) {
      padding: 0 0 80% 0;
    }
  }

  &__link {
    display: inline-block;
    position: relative;
    padding: 15px 40px;
    margin-top: 20px;
    font-size: 16px;
    text-decoration: none;
    color: $white;
    background-color: $darkTeal;
    border-radius: 10px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transition: all 0.3s;
    }

    &:hover::after {
      background-color: rgb(0, 0, 0, 0.1);
    }
  }
}

.content-failure {
  display: flex;
  justify-content: center;
  align-items: center;


  @media screen and (max-width: $md4 + px) {
    padding: 10px;
  }


  &__block {
    max-width: 600px;
    box-shadow: 5px 5px 10px;
    padding: 20px;

    @media screen and (max-width: $md4 + px) {
      padding: 15px;
    }
  }

  &__title {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    margin-top: 20px;
  }

  &__text {
    line-height: 22px;
    margin-top: 30px;
    word-wrap: break-word;

    p {
      margin-top: 10px;
    }
  }

  &__resend {
    display: block;
    margin: 40px auto 20px;
    background: $golden;
    position: relative;
    cursor: pointer;
    border-radius: 60px;
    max-width: 300px;
    line-height: 21.6px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transition: all 0.2s;
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 60px;
    }

    &:hover::after {
      opacity: 1;
    }

    button {
      border: none;
      background-color: transparent;
      font-size: 18px;
      width: 100%;
      padding: 15px 20px;
    }

    @media screen and (max-width: $md4 + px) {
      max-width: 250px;
    }
  }
}
</style>
