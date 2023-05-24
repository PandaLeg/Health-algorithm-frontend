<template>
  <div class="forgot-password__body">
    <div class="forgot-password__icon icon-password">
      <div class="icon-password__block">
        <i
            class="icon-password__key"
            :class="body.icon"
        >
        </i>
      </div>
    </div>
    <div class="forgot-password__title">
      <h1> {{ body.title }} </h1>
    </div>
    <div class="forgot-password__subtitle">
      <span> {{ body.subtitle }} </span>
    </div>
    <slot name="form"></slot>
    <slot name="receive"></slot>
  </div>
</template>

<script>
export default {
  name: 'ForgotPasswordBody',
  props: {
    body: {
      required: true
    }
  }
}
</script>

<style scoped lang="scss">

</style>
