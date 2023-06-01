<template>
  <div class="reset-password__body">
    <div class="reset-password__icon icon-password">
      <div
          class="icon-password__block"
          :class="{'reset-successfully': isSuccessfullySent}"
      >
        <i
            class="icon-password__key"
            :class="[{'reset-successfully': isSuccessfullySent}, body.icon]"
        >
        </i>
      </div>
    </div>
    <div class="reset-password__title">
      <h1> {{ body.title }} </h1>
    </div>
    <div class="reset-password__subtitle">
      <span> {{ body.subtitle }} </span>
    </div>
    <slot name="form"></slot>
    <slot name="additional"></slot>
  </div>
</template>

<script>
export default {
  name: 'ForgotPasswordBody',
  props: {
    body: {
      required: true
    },
    isSuccessfullySent: {
      default: false
    }
  }
}
</script>

<style scoped lang="scss">

</style>
