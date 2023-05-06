<template>
    <nav class="navigation">
        <div class="v-pagination">
            <button
                    class="v-pagination__navigation"
                    :disabled="isDisabledLeft"
                    @click="prev"
            >
                <ArrowLeftSVG/>
            </button>
            <div
                v-for="page in totalPages"
                :key="`p${page}`"
            >
                <button
                    class="v-pagination__item"
                    :class="{'active' : page === value}"
                    @click="pageChange(page)"
                >
                    <span>{{ page }}</span>
                </button>
            </div>
            <button
                    class="v-pagination__navigation"
                    :disabled="isDisabledRight"
                    @click="next"
            >
                <ArrowRightSVG/>
            </button>
        </div>
    </nav>
</template>

<script>
import ArrowRightSVG from "../svg/ArrowRightSVG.vue";
import ArrowLeftSVG from "../svg/ArrowLeftSVG.vue";

export default {
    name: "VPagination",
    components: {ArrowLeftSVG, ArrowRightSVG},
    props: {
        totalPages: {
            type: Number,
            default: 1
        },
        value: {
            type: Number
        }
    },
    emits: ['nextPage'],
    computed: {
        isDisabledRight() {
            return this.value === this.totalPages
        },
        isDisabledLeft() {
            return this.value === 1
        }
    },
    methods: {
        pageChange(value) {
            this.$emit('nextPage', value)
        },
        next() {
            if (!this.isDisabledRight) {
                this.pageChange(this.value + 1)
            }
        },
        prev() {
            if (!this.isDisabledLeft) {
                this.pageChange(this.value - 1)
            }
        }
    }
}
</script>

<style scoped lang="scss">
%pagination-item-bloc {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

%pagination-item-proportions {
  height: 32px;
  width: 32px;
  border-radius: 50%;
}

%pagination-item-style {
  background: #fff;
  cursor: pointer;
  box-shadow: 0 1px 4px #111;
  text-decoration: none;
  border: none;
}

%pagination-item-after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(1, 1, 1, 0.1);
  opacity: 0;
}

.navigation {
  width: 100%;
}

.v-pagination {
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  width: 100%;
  max-width: 100%;
}

.v-pagination__navigation {
  @extend %pagination-item-bloc;
  @extend %pagination-item-proportions;
  @extend %pagination-item-style;

  margin: .3rem 10px;

  &::after {
    @extend %pagination-item-after;
  }

  &:hover::after {
    opacity: 1;
  }
}

.v-pagination__item {
  @extend %pagination-item-bloc;
  @extend %pagination-item-proportions;
  @extend %pagination-item-style;

  padding: 0 5px;
  font-size: 18px;
  color: #111;
  margin: .3rem;

  &::after {
    @extend %pagination-item-after;
  }

  &:hover::after {
    opacity: 1;
  }

  &.active {
    background: #2c54cc;
    color: #fff;
  }
}
</style>
