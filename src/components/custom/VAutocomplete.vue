<template>
  <div class="autocomplete">
    <input
        v-model="modelInput"
        type="text"
        :placeholder="label"
        :disabled="disabled"
        @blur="toggle = false"
        @focus="toggle = true"
        @keydown.delete="del"
    >
    <ul
        v-if="toggle"
        class="autocomplete__box"
    >
      <li
          v-for="item in filteredItems"
          :key="`k-${item[itemTitle]}`"
          :class="[item.highlight ? activateElement : deactivateElement]"
          @mousedown.prevent
          @click="selectResult(item)"
      >
        {{ item[itemTitle] }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VAutocomplete',
  props: {
    items: {
      type: Array,
      required: true
    },
    itemTitle: {
      type: String,
      required: true
    },
    itemValue: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    modelValue: {
      required: true
    },
    search: {
      default: ''
    },
    disabled: {
      default: false
    },
    same: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    dynamic: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modelInput: '',
      filteredItems: [],
      savedItems: [],
      toggle: false,
      isDelete: false,
      tempSavedItem: ''
    }
  },
  computed: {
    activateElement() {
      const activeLink = 'active-link'
      return activeLink
    },
    deactivateElement() {
      const inactiveLink = 'inactive-link'
      return inactiveLink
    }
  },
  watch: {
    modelInput(val) {
      if (this.multiple) {
        const items = val.split(', ')
        const item = items[items.length - 1]

        this.filteredItems = this.items.filter(i => i[this.itemTitle].toLowerCase().includes(item.toLowerCase()))
      } else {
        if (this.dynamic) {
          if (!this.savedItems.length && val) {
            this.$emit('update:search', val)
          }
        } else {
          this.filteredItems = this.savedItems.length > 0 ? this.items :
              this.items.filter(i => i[this.itemTitle].toLowerCase().includes(val.toLowerCase()))
        }
      }

      if (this.isDelete) {
        this.multiple ? this.searchSavedItemToDelete(val) : this.deleteItem(val)
      }
    },
    toggle(val) {
      if (!this.multiple && !val && !!this.modelInput) {
        if (this.tempSavedItem !== this.modelInput) {
          this.modelInput = this.tempSavedItem
        }
      }
    },
    items(val) {
      this.filteredItems = val
      this.savedItems = []
    },
    modelValue(val) {
      if (this.modelValue === null || this.modelValue === '') this.modelInput = ''
    },
  },
  created() {
    this.initializeValues()
  },
  unmounted() {
    if (!this.multiple) {
      const savedItem = this.items.find(item => item[this.itemValue] === this.modelValue)

      if (savedItem) {
        this.activeLink(false, savedItem)
      }
    }
  },
  methods: {
    initializeValues() {
      if (this.multiple) {
        this.savedItems = this.items.filter(item => this.modelValue?.some(el => el === item[this.itemValue]))

        if (this.savedItems.length > 0) {
          this.modelInput = this.savedItems.map(savedItem => savedItem[this.itemTitle]).join() + ', '

          this.savedItems.forEach(savedItem => {
            this.activeLink(true, savedItem)
          })
        }
      } else {
        const savedItem = this.items.find(item => item[this.itemValue] === this.modelValue)

        if (savedItem) {
          this.modelInput = this.tempSavedItem = savedItem[this.itemTitle]
          this.savedItems.push(savedItem)

          this.activeLink(true, savedItem)
        }
      }

      this.filteredItems = this.items
    },
    selectResult(selectedItem) {
      if (selectedItem) {
        let item = this.savedItems.find(item => item[this.itemValue] === selectedItem[this.itemValue])

        if (this.same && !item && selectedItem.highlight) {
          return
        }

        if (this.multiple) {
          if (!item) {
            this.savedItems.push(selectedItem)
            this.modelInput = this.savedItems.map(savedItem => savedItem[this.itemTitle]).join() + ', '

            this.$emit('update:modelValue', this.savedItems.map(savedItem => savedItem[this.itemValue]))

            this.activeLink(true, selectedItem)
          } else {
            this.deleteSavedItem(selectedItem)
          }
        } else {
          if (!item) {
            if (this.savedItems.length > 0) this.activeLink(false, this.savedItems[0])

            this.savedItems = []

            this.modelInput = this.tempSavedItem = selectedItem[this.itemTitle]

            this.savedItems.push(selectedItem)

            this.$emit('update:modelValue', this.savedItems[0][this.itemValue])

            this.activeLink(true, this.savedItems[0])
          } else {
            this.activeLink(false, this.savedItems[0])

            this.modelInput = ''
            this.tempSavedItem = ''
            this.savedItems = []

            this.$emit('update:modelValue', null)
          }
        }

      }
    },
    del() {
      this.isDelete = true
    },
    searchSavedItemToDelete(val) {
      const splitArray = val.split(',')

      for (let i = 0; i < this.savedItems.length; i++) {
        if (this.savedItems[i][this.itemTitle] !== splitArray[i]) {
          this.deleteSavedItem(this.savedItems[i])
        }
      }

      this.isDelete = false
    },
    deleteSavedItem(savedItem) {
      const item = this.savedItems.findIndex(i => i[this.itemValue] === savedItem[this.itemValue])
      this.savedItems.splice(item, 1)

      if (this.savedItems.length > 0) {
        this.modelInput = this.savedItems.map(i => i[this.itemTitle]).join() + ', '
      } else {
        this.modelInput = this.savedItems.map(i => i[this.itemTitle]).join()
      }

      this.$emit('update:modelValue', this.savedItems.length > 0
          ? this.savedItems.map(i => i[this.itemValue]) : this.savedItems
      )
      this.activeLink(false, savedItem)
    },
    deleteItem(val) {
      if (val !== this.tempSavedItem && this.savedItems.length > 0) {
        this.activeLink(false, this.savedItems[0])

        this.modelInput = ''
        this.tempSavedItem = ''
        this.savedItems = []

        this.$emit('update:modelValue', null)

        this.isDelete = false
      }
    },
    activeLink(active, savedItem) {
      const item = this.items.find(i => i[this.itemValue] === savedItem[this.itemValue])
      const index = this.items.findIndex(i => i[this.itemValue] === savedItem[this.itemValue])

      item.highlight = active

      this.filteredItems.splice(index, 1, item)
    },
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";
@import "src/assets/scss/ui";

.autocomplete {
  background: $white;
  width: 100%;
  position: relative;

  input {
    width: 100%;
    display: block;
    padding: 13px 16px;
    cursor: pointer;
    overflow: hidden;
    z-index: 2;
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 2px solid #000;
    border-radius: 10px;
    transition: all 0.4s;

    &:focus, &:active {
      border-color: transparent;
      border-bottom-color: $darkTeal;
    }
  }

  &__box {
    display: block;
    position: absolute;
    z-index: 2;
    background: $white;
    width: 100%;
    padding: 10px 8px;
    max-height: 280px;
    overflow-y: auto;

    li {
      list-style: none;
      padding: 10px 12px;
      width: 100%;
      font-size: 16px;
      cursor: pointer;
      border-radius: 5px;

      &:not(.active-link):hover {
        background: $grayLighten2;
      }
    }
  }
}

.active-link {
  color: #1867c0 !important;
  background: rgba(187, 222, 251, 0.4);
}

.inactive-link {
  background: $white;
}

::placeholder {
  color: $darkBlue;
  font-size: 16px;
}

</style>
