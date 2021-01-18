<template>
  <main id="main">
    <div class="inner">
      <h3>성경 이용 방법 안내</h3>
      <ol>
        <li>1. 상단 메뉴 클릭</li>
        <li>2. 성경 클릭</li>
        <li>3. 장 클릭</li>
      </ol>
    </div>
  </main>
</template>

<script>
import { ROUTE_NAMES } from 'src/constants'

export default {
  name: ROUTE_NAMES.MAIN
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  .inner {
    width: 80%;
    max-width: 750px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: 20px;
    box-sizing: border-box;
  }
  h3 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 10px 0 15px;
    margin-bottom: 20px;
  }
  li {
    padding: 10px 0;
  }
}
</style>
