<template>
  <div class="reset-password">
    <div class="container">
      <template v-if="!isSuccessfullySent">
        <ForgotPasswordBody :body="body">
          <template v-slot:form>
            <form
                @submit.prevent
                class="reset-password__form"
            >
              <div
                  class="reset-password__email"
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
                  class="reset-password__reset-btn"
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
          <template v-slot:additional>
            <div class="reset-password__receive">
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
import ForgotPasswordBody from "../../components/auth/ResetPasswordBody.vue";
import initState from "../../hooks/auth/forgot-password/initState";
import {useVuelidate} from "@vuelidate/core";
import computedErrors from "../../hooks/computedErrors";
import sendResetCodeHook from "../../hooks/auth/forgot-password/send-reset-code.hook";

export default {
  name: 'ForgotPasswordPage',
  components: {
    ForgotPasswordBody
  },
  setup() {
    const {email, isSuccessfullySent, rule, body} = initState()
    const v$ = useVuelidate(rule, {email})

    const {emailErrors} = computedErrors(v$)
    const {sendResetCode} = sendResetCodeHook(v$, email, isSuccessfullySent)

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
@import "src/assets/scss/reset-password";
</style>
