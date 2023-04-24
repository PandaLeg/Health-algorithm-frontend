<template>
    <div
            v-if="isOpen"
            class="snackbar"
    >
        <div class="snackbar__body">
            <div class="snackbar__content">
                <span>
                    <slot></slot>
                </span>
            </div>
            <div class="snackbar__btn">
                <button @click="isOpen = false">
                    <span>Close</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "VSnackBar",
    props: {
        duration: {
            type: Number,
            default: 4000
        },
        modelValue: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        isOpen: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        }
    },
    watch: {
        isOpen(value) {
            if (value) {
                setTimeout(() => {
                    this.isOpen = false
                }, this.duration)
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.snackbar {
  display: inline-block;
  position: fixed;
  right: 0;
  margin: 10px 10px 0;
  //animation: SnackbarAnimation 0.4s ease-in-out;

  &__body {
    display: flex;
    background-color: #333;
    max-width: 400px;
    border-radius: 5px;
  }

  &__content {
    flex: 1 1;
    color: white;
    word-break: break-all;
    line-height: 1.25rem;
    padding: 14px 16px;
  }

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-inline-end: 8px;

    button {
      height: 36px;
      border: none;
      background: transparent;
      min-width: auto;
      padding: 0 10px;
      text-transform: uppercase;
      transition: all 0.3s;

      span {
        color: $darkTeal;
      }

      &:hover {
        border-radius: 5px;
        background: rgba(0, 150, 136, 0.59);

        span {
          color: $white;
        }
      }
    }
  }
}

@keyframes SnackbarAnimation {
  from {
    transform: scale(0)
  }
  to {
    transform: scale(1)
  }
}
</style>
