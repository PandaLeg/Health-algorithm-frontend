<template>
  <div class="dialog">
    <div class="dialog__scrim"></div>
    <div class="dialog__content" ref="dialogRef">
      <div class="dialog__card dialog-card">
        <header class="dialog-card__toolbar dialog-toolbar">
          <div class="dialog-toolbar__content">
            <div class="dialog-toolbar__title">
              <div class="dialog-toolbar__placeholder">
                {{ title }}
              </div>
            </div>
          </div>
        </header>
        <div class="dialog-card__content card-content">
          <div class="card-content__container">
            <slot name="content"></slot>
          </div>
        </div>
        <div class="dialog-card__actions">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {onMounted, ref} from "vue";

export default {
  name: "VDialog",
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: 'auto'
    }
  },
  setup(props) {
    const dialogRef = ref(null)

    onMounted(() => {
      const width = props.width
      dialogRef.value.style.width = width === 'auto' ? width : width + 'px'
    })

    return {dialogRef}
  }
}
</script>

<style lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";

.dialog {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;

  &__scrim {
    position: fixed;
    pointer-events: none;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgb(0, 0, 0);
    opacity: .32;
  }

  &__content {
    display: flex;
    flex-direction: column;
    max-width: calc(100% - 50px);
    max-height: calc(100% - 50px);
    margin: 20px;
    position: absolute;
  }

  &__card {
    display: flex;
    flex-direction: column;
    background: $white;
  }
}

.dialog-card {
  overflow: hidden;
  text-decoration: none;

  &__toolbar {
    flex: none;
  }

  &__content {
    flex: 1 1 auto;
    padding: 16px 24px 10px;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 40px;
    padding: 8px;
    gap: 5px;
  }
}

.dialog-toolbar {
  background-color: $darkTeal;
  color: $white;

  &__content {
    height: 64px;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    padding: 0 10px 0 0;
  }

  &__title {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 1.25rem;
    margin-inline-start: 16px;
  }

  &__placeholder {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
