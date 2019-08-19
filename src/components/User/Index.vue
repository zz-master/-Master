<template>
  <div class="user-wapper mr20">
    <img class="avatar" :src="userAvatar" alt />
    <p class="text name mt5">{{userName}}</p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'user-index',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'userName',
      'userAvatar',
      'userRole',
      'userId'
    ])
  }
}
</script>
<style lang="scss">
.user-wapper {
  float: right;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>