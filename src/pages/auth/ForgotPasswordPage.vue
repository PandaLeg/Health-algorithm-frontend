<template>
  <div class="forgot-password">
    <div class="container">
      <div class="forgot-password__body">
        <div class="forgot-password__icon icon-password">
          <div class="icon-password__block">
            <i class="icon-password__key _icon-key"></i>
          </div>
        </div>
        <div class="forgot-password__title">
          <h1>Forgot password?</h1>
        </div>
        <div class="forgot-password__subtitle">
          <span>No worries, we'll send you reset instruction.</span>
        </div>
        <form
            @submit.prevent
            class="forgot-password__form"
        >
          <div
              class="forgot-password__email"
              :class="{'form-error': v$.email.$error}"
          >
            <label>Email</label>
            <input
                v-model="email"
                placeholder="Enter your email"
                type="email"
                required
                @input="v$.email.$touch"
            >
            <div class="input-error">
              {{ emailErrors[0] }}
            </div>
          </div>
          <div
              class="forgot-password__reset-btn"
              @click="sendResetCode"
          >
            <button>
              <span>
                Reset password
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import regMountedState from "../../hooks/regMountedState";
import initState from "../../hooks/auth/forgot-password/initState";
import {useVuelidate} from "@vuelidate/core";
import computedErrors from "../../hooks/computedErrors";
import sendMail from "../../hooks/auth/forgot-password/sendMail";

export default {
  name: 'ForgotPasswordPage',
  setup() {
    const {email, rule} = initState()
    const v$ = useVuelidate(rule, { email })

    const {emailErrors} = computedErrors(v$)
    const {sendResetCode} = sendMail(v$, email)

    regMountedState()

    return {
      v$,
      email,
      emailErrors,
      sendResetCode
    }
  }
}
</script>


<style scoped lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";
@import "src/assets/scss/icons";

.forgot-password {
  height: 100%;

  &__body {
    max-width: 400px;
    margin: 0 auto;
    padding: 80px 20px 20px;
  }

  &__icon {
    text-align: center;
    margin-bottom: 25px;
  }

  &__title {
    font-size: 25px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 15px;
  }

  &__subtitle {
    text-align: center;
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 16px;
    color: $grayDarken1;
  }

  &__form {
    padding: 0 5px;

    input {
      @extend %field-reg;
      padding: 12px 8px;
      border: 1px solid $grayDarken3;
      font-size: 15px;
    }

    label {
      @extend %label-reg;
      font-size: 14px;
    }
  }

  &__email {
    margin-bottom: 20px;
  }

  &__reset-btn {
    background: $darkTeal2;
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
      padding: 12px 8px;

      span {
        font-family: 'MyRoboto', sans-serif;
        font-size: 16px;
        color: $white;
      }
    }
  }
}

.icon-password {
  &__block {
    font-size: 24px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: rgba(245, 201, 134, 0.3);
    padding: 10px;
  }

  &__key {
    color: #21243D;
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
</style>
