<template>
  <div class="forgot-password">
    <div class="container">
      <template v-if="!isSuccessfullySent">
        <ForgotPasswordBody :body="body">
          <template v-slot:form>
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
          </template>
        </ForgotPasswordBody>
      </template>
      <template v-else>
        <ForgotPasswordBody :body="body">
          <template v-slot:receive>
            <div class="forgot-password__receive">
              <span> Didn't receive the email? </span>
              <a href="#" @click="sendResetCode"> Click to resend </a>
            </div>
          </template>
        </ForgotPasswordBody>
      </template>
    </div>
  </div>
</template>

<script>
import ForgotPasswordBody from "../../components/auth/ForgotPasswordBody.vue";
import regMountedState from "../../hooks/regMountedState";
import initState from "../../hooks/auth/forgot-password/initState";
import {useVuelidate} from "@vuelidate/core";
import computedErrors from "../../hooks/computedErrors";
import sendMail from "../../hooks/auth/forgot-password/sendMail";

export default {
  name: 'ForgotPasswordPage',
  components: {
    ForgotPasswordBody
  },
  setup() {
    const {email, isSuccessfullySent, rule, body} = initState()
    const v$ = useVuelidate(rule, {email})

    const {emailErrors} = computedErrors(v$)
    const {sendResetCode} = sendMail(v$, email, isSuccessfullySent)

    regMountedState()

    return {
      v$,
      email,
      emailErrors,
      isSuccessfullySent,
      body,
      sendResetCode
    }
  }
}
</script>

<style lang="scss">
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
    line-height: 23px;
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

  &__receive {
    font-size: 13px;
    text-align: center;
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
