<template>
  <div class="menu-step">
    <div
        class="menu-step__item"
        :class="{'active-step': isGeneralActive, 'success-step': isGeneralSuccess }"
    >
      <div class="menu-step__number">
        <span>1</span>
      </div>
      <div class="menu-step__bar"></div>
    </div>
    <div
        class="menu-step__item"
        :class="{'active-step': isSpecialtyActive, 'success-step': isSpecialtySuccess }"
    >
      <div class="menu-step__number">
        <span>2</span>
      </div>
      <div class="menu-step__bar"></div>
    </div>
    <div class="menu-step__item">
      <div class="menu-step__number">
        <span>3</span>
      </div>
      <div class="menu-step__bar"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegistrationStepper",
  props: {
    isGeneralActive: {required: true},
    isGeneralSuccess: {required: true},
    isSpecialtyActive: {required: true},
    isSpecialtySuccess: {required: true}
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.menu-step {
  display: flex;
  position: relative;
  padding: 20px 15px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: $grayLighten2;
  }

  &__item {
    flex: 0 1 33.333%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }

  &__number {
    font-family: "MyRoboto", sans-serif;
    font-weight: 500;
    font-size: 20px;
    background: $grayLighten2;
    padding: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    span {
      color: $darkBlue;
    }
  }

  &__bar {
    margin-left: 10px;
    flex: 1;
    height: 7px;
    background: $grayLighten2;
    border-radius: 21px;
    position: relative;
    transition: width, background 0.3s;

    &::before {
      content: '';
      position: absolute;
      height: inherit;
      border-radius: inherit;
      left: 0;
      top: 0;
    }
  }
}

.active-step, .success-step {
  .menu-step__number {
    background: $darkTeal;

    span {
      color: $white;
    }
  }

  .menu-step__bar {
    &::before {
      background: $darkTeal;
      width: 50%;
    }
  }
}

.success-step {
  .menu-step__bar {
    &::before {
      background: $darkTeal;
      width: 100%;
    }
  }
}
</style>
