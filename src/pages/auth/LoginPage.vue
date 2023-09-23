<template>
  <div class="login">
    <div class="container">
      <div class="login__body">
        <div class="login__item">
          <div class="login__logo">
            <router-link :to="{ name: routesNames.home.name }">
              <LogoSVG/>
            </router-link>
          </div>
          <div class="login__title">
            <h1>Welcome</h1>
          </div>
          <form
              @submit.prevent
              class="login__form"
          >
            <div
                class="login__phone"
                :class="{'form-error': v$.phone.$error}"
            >
              <label>Phone *</label>
              <input
                  v-model="userCredentials.phone"
                  placeholder="Enter phone"
                  required
                  @blur="v$.phone.$touch"
                  @input="v$.phone.$touch"
              >
              <div class="input-error">
                {{ phoneErrors[0] }}
              </div>
            </div>
            <div
                class="login__password"
                :class="{'form-error': v$.password.$error}"
            >
              <label>Password *</label>
              <input
                  v-model="userCredentials.password"
                  type="password"
                  placeholder="Enter password"
                  required
                  @blur="v$.password.$touch"
                  @input="v$.password.$touch"
              >
              <div class="input-error">
                {{ passwordErrors[0] }}
              </div>
            </div>
            <div
                class="login__button"
                @click="loginUser"
            >
              <button>
                <span>
                  Sign In
                </span>
              </button>
            </div>
          </form>
          <div class="login__forgot-password">
            <router-link
                :to="{name: routesNames.forgotPassword.name}"
                class="login__link"
            >
              Forgot password?
            </router-link>
          </div>
          <div class="login__href-registration">
            <span class="login__account">
              Don't have an account?
            </span>
            <div class="login__select-type">
              <router-link
                  :to="{name: routesNames.registrationPatient.name}"
                  class="login__link"
              >
                Patient
              </router-link>
              <router-link
                  :to="{name: routesNames.registrationDoctor.name}"
                  class="login__link"
              >
                Doctor
              </router-link>
              <router-link
                  :to="{name: routesNames.registrationClinic.name}"
                  class="login__link"
              >
                Clinic
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routesNames from "../../router/routes-names";
import LogoSVG from "../../components/svg/LogoSVG.vue";
import {useVuelidate} from "@vuelidate/core";
import initState from "../../hooks/auth/init-state-rules.hook";
import computedErrors from "../../hooks/computed-errors.hook";
import login from "../../hooks/auth/login.hook";
import regMountedState from "../../hooks/reg-mounted-state.hook";

export default {
  name: "LoginPage",
  components: {
    LogoSVG,
  },
  setup() {
    const {userCredentials, rule} = initState()
    const v$ = useVuelidate(rule, userCredentials)

    const {phoneErrors, passwordErrors} = computedErrors(v$)
    const {loginUser} = login(v$, userCredentials)
    regMountedState()

    return {
      v$,
      userCredentials,
      phoneErrors, passwordErrors,
      loginUser
    }
  },
  computed: {
    routesNames() {
      return routesNames
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";

.login {
  height: 100%;

  &__body {
    max-width: 600px;
    padding: 80px 0;
    margin: 0 auto;
  }

  &__item {
    display: flex;
    flex-direction: column;
    padding: 0 20px 50px;
    background-color: $white;
    border-radius: 50px;
    gap: 25px;

    @media screen and (max-width: $md4 + px) {
      padding: 0 10px 20px;
    }
  }

  &__logo {
    align-self: center;

    a {
      text-decoration: none;
      width: 108px;
      height: 108px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $darkTeal;
      border-radius: 50%;
      margin: -34px auto 0;
      overflow: hidden;
    }
  }

  &__title {
    font-family: "MyRoboto", sans-serif;
    font-size: 1.875rem;
    font-weight: 700;
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 60px;
    margin: 30px 0;

    input {
      @extend %field-reg;
    }

    @media screen and (max-width: $md4 + px) {
      padding: 0 25px;
      margin: 20px 0;
    }

  }

  &__button {
    background: $golden;
    text-align: center;
    position: relative;
    cursor: pointer;
    padding: 1px 0;
    border-radius: 5px;

    &::after {
      @extend %after-effect-btn;
    }

    &:hover::after {
      opacity: 1;
    }

    button {
      border: none;
      background-color: transparent;
      width: 100%;
      padding: 12px 30px;

      span {
        font-family: 'MyRoboto', sans-serif;
        font-size: 16px;
      }
    }
  }

  &__forgot-password, &__href-registration {
    text-align: center;
  }

  &__select-type {
    margin-top: 10px;
  }

  &__link {
    text-decoration: none;
    color: $grayDarken1;
    transition: all 0.2s;
    position: relative;


    &:hover {
      color: $darkTeal;
    }

    .login__select-type > & {
      padding: 0 0.5rem;
    }

    .login__select-type > &:not(:last-child)::after {
      content: '';
      position: absolute;
      background-color: $grayDarken1;;
      width: 1px;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
}

.input-error {
  @extend %input-error;
}

.form-error {
  input {
    @extend %form-error;
  }
}

label {
  @extend %label-reg;
}
</style>
