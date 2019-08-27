<template>
  <div class="student-wapper">
    <div class="left-wapper">
      <Master></Master>
      <Note></Note>
    </div>
    <div class="right-wapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Master from './Master/Index.vue'
import Note from './Note/Index.vue'
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      onlineStatue: state => state.global.onlineStatue
    })
  },
  components: {
    Master,
    Note
  }
}
</script>
<style lang="scss">
.student-wapper {
  height: calc(100% - 70px);
  display: flex;
  flex-direction: row;
  .left-wapper {
    width: 300px;
    height: 100%;
    padding: 0 10px;
    box-shadow: 5px 0px 16px 0px rgba(0, 0, 0, 0.07);
  }
  .right-wapper {
    width: calc(100% - 300px);
    height: 100%;
    background-image: url("../assets/img/bg.png");
  }
}
</style>