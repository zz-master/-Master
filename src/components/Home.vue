<template>
  <div class="ma-home-wapper">
    <div class="header"></div>
    <div class="main">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <Login></Login>
  </div>
</template>
<script>
import Login from './Login.vue'
export default {
  data() {
    return {}
  },
  components: {
    Login
  },
  computed: {
  }
}
</script>
<style lang="scss">
.ma-home-wapper {
  width: 100%;
  height: 100%;
  max-width: 1440px;
  min-width: 800px;
  margin: 0 auto;
  .header {
    height: 70px;
    width: 100%;
    background: red;
  }
  .main {
    display: flex;
    width: 100%;
    height: calc(100% - 70px);
    .left {
      width: 400px;
      height: 100%;
      background: yellow;
    }
    .right {
      flex: 1;
      background: #000;
    }
  }
}
</style>