<template functional>
  <nav v-show="props.isMenuOpen">
    <ul>
      <li
        v-for="(menu, menuId) in props.menus" 
        :key="menuId"
      >
        <slot
          name="menu"
          :menuId="menuId"
          :category="menu.category"
          :items="menu.items"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    menus: {
      type: Object,
      required: true
    },
    isMenuOpen: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  background: #ffffff;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 8px 0;
}
</style>
