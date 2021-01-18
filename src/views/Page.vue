<template>
  <main id="page">
    <ul class="bible">
      <li
        v-for="(line, index) in bible"
        :key="index"
        class="verse"
      >
        <i class="index">{{ index + 1 }}</i>
        <span class="text">{{ line }}</span>
      </li>
    </ul>
  </main>
</template>

<script>
import { ROUTE_NAMES } from 'src/constants'

export default {
  name: ROUTE_NAMES.PAGE,
  props: {
    bible: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.bible {
  padding: 16px;
}

.verse {
  position: relative;
}

.index {
  position: absolute;
  top: 0;
  left: 0;
  width: 25px;
  display: inline-block;
  text-align: center;
  font-weight: 700;
}

.text {
  display: inline-block;
  padding-left: 32px;
}
</style>
