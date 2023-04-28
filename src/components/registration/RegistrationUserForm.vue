<template>
    <form @submit.prevent class="registration__form">
        <div class="registration__title-avatar-group">
            <div class="registration__title">
                <span>Hover over the area below to select an image</span>
            </div>
            <div class="registration__avatar">
                <label for="image">+</label>
                <input
                        type="file"
                        id="image"
                        accept="image/*"
                        @change="onChangeImage"
                >
                <template v-if="imageUrl">
                    <img
                            :src="imageUrl"
                            alt="Not found"
                    >
                </template>
            </div>
        </div>
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
        <div class="registration__button" @click="$emit('registration')">
            <button>Sign Up</button>
        </div>
    </form>
</template>

<script>

export default {
    name: "RegistrationUserForm",
    props: {
        v$: {required: true},
        phone: {required: true},
        email: {required: true},
        password: {required: true},
        city: {required: true},
        image: {default: null},
        phoneErrors: {required: true},
        emailErrors: {required: true},
        passwordErrors: {required: true},
        cityErrors: {required: true}
    },
    data() {
        return {
            imageUrl: ''
        }
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
        modelImage: {
            get() {
                return this.image
            },

            set(value) {
                this.$emit('update:image', value)
            }
        },
    },
    methods: {
        onChangeImage(e) {
            const files = e.target.files;

            if (files[0]) {
                const file = e.target.files[0]

                if (file.name.lastIndexOf('.') <= 0) {
                    return
                }

                const fr = new FileReader();
                fr.readAsDataURL(file);

                fr.addEventListener('load', () => {
                    this.imageUrl = fr.result
                    this.modelImage = file
                })
            }
        }
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
      font-size: 16px;
      width: 100%;
      padding: 12px 30px;
    }
  }

  &__title {
    span {
      @extend %labelReg;
    }
  }

  &__avatar {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: #333333;
      opacity: 0;
      transition: all 0.3s;
      z-index: 1;
    }

    &:hover {
      label {
        display: block;
        font-size: 48px;
        color: #fff;
        cursor: pointer;
        z-index: 1;
      }

      &::before {
        opacity: 1;
      }
    }

    input, label {
      display: none;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
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
