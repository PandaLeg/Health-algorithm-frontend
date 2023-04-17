<template>
    <form @submit.prevent class="registration__form">
        <div
                class="registration__phone"
                :class="{'form-error': v$.phone.$error}"
        >
            <label>Phone *</label>
            <input
                    v-model="modelPhone"
                    placeholder="Enter phone"
                    required
                    @input="v$.phone.$touch"
                    @blur="v$.phone.$touch"
            />
            <div class="input-error">
                {{ phoneErrors[0] }}
            </div>
        </div>
        <div
                class="registration__email"
                :class="{'form-error': v$.email.$error}"
        >
            <label>Email *</label>
            <input
                    v-model="modelEmail"
                    type="email"
                    placeholder="Enter email"
                    required
                    @input="v$.email.$touch"
                    @blur="v$.email.$touch"
            />
            <div class="input-error">
                {{ emailErrors[0] }}
            </div>
        </div>
        <div
                class="registration__password"
                :class="{'form-error': v$.password.$error}"
        >
            <label>Password *</label>
            <input
                    v-model="modelPassword"
                    type="password"
                    placeholder="Enter password"
                    required
                    @input="v$.password.$touch"
                    @blur="v$.password.$touch"
            />
            <div class="input-error">
                {{ passwordErrors[0] }}
            </div>
        </div>
        <div
                class="registration__city"
                :class="{'form-error': v$.city.$error}"
        >
            <label>City *</label>
            <input
                    v-model="modelCity"
                    placeholder="Enter city"
                    required
                    @input="v$.city.$touch"
                    @blur="v$.city.$touch"
            />
            <div class="input-error">
                {{ cityErrors[0] }}
            </div>
        </div>
        <slot></slot>
        <div class="registration__reg-button" @click="$emit('registration')">
            <button>Sign Up</button>
        </div>
    </form>
</template>

<script>

export default {
    name: "RegistrationUserForm",
    props: {
        v$: {
            required: true
        },
        phone: {
            required: true,
        },
        email: {
            required: true,
        },
        password: {
            required: true,
        },
        city: {
            required: true,
        },
        phoneErrors: {
            required: true
        },
        emailErrors: {
            required: true
        },
        passwordErrors: {
            required: true
        },
        cityErrors: {
            required: true
        },
    },
    computed: {
        modelPhone: {
            get() {
                return this.phone
            },

            set(value) {
                this.$emit('update:phone', value)
            }
        },
        modelEmail: {
            get() {
                return this.email
            },

            set(value) {
                this.$emit('update:email', value)
            }
        },
        modelPassword: {
            get() {
                return this.password
            },

            set(value) {
                this.$emit('update:password', value)
            }
        },
        modelCity: {
            get() {
                return this.city
            },

            set(value) {
                this.$emit('update:city', value)
            }
        },
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";

.registration {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__reg-button {
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
      font-size: 16px;
      width: 100%;
      padding: 12px 30px;
    }
  }
}

input {
  @extend %fieldReg;
}

label {
  @extend %labelReg;
}

::placeholder {
  color: $darkBlue;
  font-size: 16px;
}
</style>
