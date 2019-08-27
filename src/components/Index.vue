<template>
  <div class="let-index-wapper">
    <User :onlineStatus="onlineStatus" @openLogin="openLogin"></User>
    <Default v-if="isDefault"></Default>
    <Teacher v-if="isTeacher"></Teacher>
    <Student v-if="isStudent"></Student>
    <Login :loginDialog="loginDialog" @openLogin="openLogin"></Login>
  </div>
</template>
<script>
import Default from './Default.vue'
import Teacher from './Teacher.vue'
import Student from './Student.vue'
import User from './User/Index.vue'
import Login from './Login/Index.vue'
import { mapState, mapGetters } from 'vuex'
import { getCookie } from '../utils/tool.js'
import masterService from '../service/base.js'
import Simditor from './Simditor/Index.vue'
export default {
  data() {
    return {
      loginDialog: false
    }
  },
  components: {
    Default,
    Teacher,
    Student,
    User,
    Login
  },
  computed: {
    ...mapState({
      onlineStatus: state => state.global.onlineStatus
    }),
    ...mapGetters(['userRole']),
    isTeacher() {
      return this.onlineStatus && this.userRole === 2
    },
    isStudent() {
      return this.onlineStatus && this.userRole === 1
    },
    isDefault() {
      return !this.onlineStatus
    }
  },
  watch: {
    onlineStatus(newVal) {
      if (!newVal) {
        return
      }
      this.$router.replace({ name: 'default', query: { time: new Date().getTime() } })
    }
  },
  methods: {
    openLogin(state) {
      this.loginDialog = state
    },
    isLogined() {
      if (getCookie('csrftoken')) {
        this.apiGetUserInfo()
      }
    },
    async apiGetUserInfo() {
      try {
        let { data: { userinfo } } = await masterService.apiGetUserInfo()
        this.$store.dispatch('updateUserInfo', userinfo)
        this.$store.dispatch('updateOnlineStatus')
        console.warn('[api][获取用户信息]', userinfo)
      } catch (err) {
        console.warn('[api][获取用户信息]', err)
      }
    }
  },
  mounted() {
    this.isLogined()
    console.warn('onlineStatus', this.onlineStatus, this.userRole)
  }
}
</script>
<style lang="scss">
.let-index-wapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>