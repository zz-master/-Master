<template>
  <div class="index-wapper">
    <div class="head-wapper">
      <User></User>
    </div>
    <div class="main-wapper">
      <div class="left-wapper">
        <Master></Master>
        <Note></Note>
      </div>
      <div class="right-wapper">
        <router-view></router-view>
      </div>
    </div>
    <div class="foot-wapper"></div>
    <Login></Login>
  </div>
</template>
<script>
import Login from './Login/Index.vue'
import User from './User/Index.vue'
import Master from './Master/Index.vue'
import Note from './Note/Index.vue'
export default {
  data() {
    return {}
  },
  components: {
    User,
    Master,
    Note,
    Login
  }
}
</script>
<style lang="scss">
.index-wapper {
  width: 100%;
  height: 100%;
  max-width: 1440px;
  min-width: 800px;
  margin: 0 auto;
  .head-wapper {
    height: 70px;
    width: 100%;
    border-bottom: 1px solid #e3e3e3;
  }
  .main-wapper {
    width: 100%;
    height: calc(100% - 70px);
    display: flex;
    .left-wapper {
      width: 300px;
      height: 100%;
      padding: 10px 30px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      box-shadow: 5px 0px 16px 0px rgba(0, 0, 0, 0.07);
    }
    .right-wapper {
      height: 100%;
      width: calc(100% - 300px);
    }
  }
}
</style>