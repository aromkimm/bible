<template functional>
  <div class="drop-down">
    <button
      class="drop-button"
      :class="{ selected: props.isOpen }"
      @click="listeners.toggleCategory(props.category)"
    >
      <span class="category">{{ props.category }}</span>
      <i
        class="icon im"
        :class="[`im-angle-${props.isOpen ? 'up' : 'down'}`]"
      />
    </button>
    <ul
      v-show="props.isOpen"
      class="drop-list"
    >
      <li
        v-for="(item, index) in props.items"
        :key="index"
        :class="{ selected: props.category === props.currentCategory && item === props.currentItem }"
        @click="listeners.goTo(props.itemId, item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    itemId: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    items: {
      type: [Number, Array],
      required: true
    },
    currentCategory: {
      type: String,
      required: true
    },
    currentItem: {
      type: [Number, String],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.drop-down {
  width: 100%;
  .drop-button {
    width: 100%;
    height: 48px;
    position: relative;
    & > * {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
    }
    .category { left: 10px; }
    .icon { right: 10px; }
  }
  .drop-list {
    overflow: hidden;
    li {
      float: left;
      height: 35px;
      width: 59px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}

.selected {
  color: #f44336;
  font-weight: 700;
}
</style>