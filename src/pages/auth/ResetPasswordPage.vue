<template>
  <div class="reset-password">
    <div class="container">
      <template v-if="!isSuccessfullySent">
        <ResetPasswordBody :body="body">
          <template v-slot:form>
            <form
                @submit.prevent
                class="reset-password__form"
            >
              <div
                  class="reset-password__password"
                  :class="{'form-error': v$.password.$error}"
              >
                <label>Password</label>
                <input
                    v-model="password"
                    placeholder="Enter your password"
                    type="password"
                    required
                    @input="v$.password.$touch"
                >
                <div class="input-error">
                  {{ passwordErrors[0] }}
                </div>
              </div>
              <div
                  class="reset-password__confirm-password"
                  :class="{'form-error': v$.confirmPassword.$error}"
              >
                <label>Confirm password</label>
                <input
                    v-model="confirmPassword"
                    placeholder="Enter confirm password"
                    type="password"
                    required
                    @input="v$.confirmPassword.$touch"
                >
                <div class="input-error">
                  {{ confirmPasswordErrors[0] }}
                </div>
              </div>
              <div
                  class="reset-password__reset-btn"
                  @click="resetPassword"
              >
                <button>
                        <span>
                          Reset password
                        </span>
                </button>
              </div>
            </form>
          </template>
        </ResetPasswordBody>
      </template>
      <template v-else>
        <ResetPasswordBody
            :body="body"
            :is-successfully-sent="isSuccessfullySent"
        >
          <template v-slot:additional>
            <div class="reset-password__continue">
              <router-link :to="{name: routesNames.login.name}">
                Continue
              </router-link>
            </div>
          </template>
        </ResetPasswordBody>
      </template>
    </div>
  </div>
</template>

<script>

import {useVuelidate} from "@vuelidate/core";
import computedErrors from "../../hooks/computed-errors.hook";
import initState from "../../hooks/auth/reset-password/init-state.hook";
import ResetPasswordBody from "../../components/auth/ResetPasswordBody.vue";
import resetPasswordHook from "../../hooks/auth/reset-password/reset-password.hook";
import routes from "../../router/routes-names";
import {computed} from "vue";

export default {
  name: 'ResetPasswordPage',
  components: {
    ResetPasswordBody
  },
  setup() {
    const {password, confirmPassword, isSuccessfullySent, body, rules} = initState()
    const v$ = useVuelidate(rules, {password, confirmPassword})

    const {passwordErrors, confirmPasswordErrors} = computedErrors(v$)
    const {resetPassword} = resetPasswordHook(v$, password, confirmPassword, isSuccessfullySent)

    const routesNames = computed(() => routes)

    return {
      password,
      confirmPassword,
      body,
      isSuccessfullySent,
      v$,
      passwordErrors,
      confirmPasswordErrors,
      resetPassword,
      routesNames
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/scss/reset-password";
</style>
