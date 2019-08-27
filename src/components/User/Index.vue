<template>
  <div class="let-user-wapper">
    <div class="let-user-info" v-if="onlineStatus">
      <img class="avatar" :src="userAvatar" alt />
      <div class="let-info let-mt5">{{userName}}</div>
    </div>
    <div v-else class="let-user-login-bt let-content" @click="handleLogin">登录</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'user-index',
  props: {
    onlineStatus: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters([
      'userName',
      'userAvatar'
    ])
  },
  methods: {
    handleLogin() {
      this.$emit('openLogin', true)
    }
  }
}
</script>
<style lang="scss">
.let-user-wapper {
  height: 70px;
  width: 100%;
  padding-right: 20px;
  background-image: url("../../assets/img/user-bg.png");
  .let-user-info {
    height: 100%;
    float: right;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .let-user-login-bt {
    float: right;
    height: 100%;
    line-height: 70px;
    cursor: pointer;
  }
}
</style>