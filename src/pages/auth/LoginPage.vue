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
                                :to="{name: routesNames.registration.name}"
                                class="login__link"
                        >
                            Forgot password?
                        </router-link>
                    </div>
                    <div class="login__href-registration">
                        <router-link
                                :to="{name: routesNames.registration.name}"
                                class="login__link"
                        >
                            Don't have an account?
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import routesNames from "../../router/routesNames";
import LogoSVG from "../../components/svg/LogoSVG.vue";
import {useVuelidate} from "@vuelidate/core";
import initState from "../../hooks/auth/initStateAndRules";
import computedErrors from "../../hooks/computedErrors";
import login from "../../hooks/auth/login";

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
  background-color: $grayLighten2;

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
      @extend %fieldReg;
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
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transition: all 0.2s;
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.2);
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

  &__link {
    text-decoration: none;
    color: $grayDarken1;
    transition: all 0.2s;

    &:hover {
      color: $darkTeal;
    }
  }
}

label {
  @extend %labelReg;
}
</style>
