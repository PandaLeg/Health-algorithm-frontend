<template>
  <form @submit.prevent class="registration__form">
    <div class="registration__title-avatar-group">
      <div class="registration__title">
        <span>Hover over the area below or click on it to select an image</span>
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
    <div class="registration__contact-group">
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
        <div
            v-for="error in v$.phone.$errors"
            :key="error.$uid"
            class="input-error"
        >
          {{ error.$message }}
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
        <div
            v-for="error in v$.email.$errors"
            :key="error.$uid"
            class="input-error"
        >
          {{ error.$message }}
        </div>
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
      <div
          v-for="error in v$.password.$errors"
          :key="error.$uid"
          class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
    <slot></slot>
    <slot name="continue"></slot>
  </form>
</template>

<script>

import {computed, ref} from "vue";

export default {
  name: "RegistrationUserForm",
  props: {
    v$: {required: true},
    phone: {required: true},
    email: {required: true},
    password: {required: true},
    image: {default: null},
  },
  setup(props, {emit}) {
    const imageUrl = ref('')
    const modelPhone = computed({
      get: () => props.phone,
      set: (val) => emit('update:phone', val)
    })

    const modelEmail = computed({
      get: () => props.email,
      set: (val) => emit('update:email', val)
    })

    const modelPassword = computed({
      get: () => props.password,
      set: (val) => emit('update:password', val)
    })

    const modelImage = computed({
      get: () => props.image,
      set: (val) => emit('update:image', val)
    })

    const onChangeImage = (e) => {
      const files = e.target.files;

      if (files[0]) {
        const file = e.target.files[0]

        if (file.name.lastIndexOf('.') <= 0) {
          return
        }

        const fr = new FileReader();
        fr.readAsDataURL(file);

        fr.addEventListener('load', () => {
          imageUrl.value = fr.result
          modelImage.value = file
        })
      }
    }

    return {
      imageUrl,
      modelPhone,
      modelEmail,
      modelPassword,
      modelImage,
      onChangeImage
    }
  },
}
</script>

<style lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";

.registration {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__button {
    text-align: center;
    padding: 1px 0;

    button {
      position: relative;
      z-index: 1;
      border: none;
      border-radius: 5px;
      background: $golden;
      font-size: 16px;
      width: 100%;
      padding: 12px 30px;

      &::after {
        @extend %after-effect-btn;
      }

      &:hover::after {
        opacity: 1;
      }
    }
  }

  &__title {
    span {
      @extend %label-reg;
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

  &__contact-group {
    display: flex;
    gap: 15px;

    @media screen and (max-width: $md4 + px) {
      flex-direction: column;
    }
  }

  &__phone, &__email {
    flex: 0 1 50%;

    @media screen and (max-width: $md4 + px) {
      flex-basis: 100%;
    }
  }
}

.input-error {
  @extend %input-error;
}

.form-error {
  input, select {
    @extend %form-error;
  }
}

input {
  @extend %field-reg;
}

label {
  @extend %label-reg;
}

::placeholder {
  color: $darkBlue;
  font-size: 16px;
}
</style>
