<template>
  <div class="login-wapper" v-show="loginDialog">
    <div class="mask"></div>
    <div class="dialog login-dialog">
      <div class="title login-title">@Master</div>
      <div class="login-phone mt20">
        <input type="text" placeholder="请输入手机号" v-model="phone" @focus="msg = null" />
      </div>
      <div class="login-code mt20">
        <input type="text" placeholder="请输入验证码" v-model="code" @focus="msg = null" />
        <button
          class="button ml20 get-code"
          :class="{'button-disable':!sendCode}"
          :disabled="!sendCode"
          @click="handleGetCode()"
        >{{getCodeText}}</button>
      </div>
      <div
        class="message login-message"
        :class="{danger:msgType==='danger',success:msgType==='success'}"
      >{{msg}}</div>
      <div class="button button-primary" @click="handleLogin">登录</div>
    </div>
  </div>
</template>
<script>
import { checkPhone, getCookie } from '../../utils/tool.js'
import masterService from '../../service/base.js'
export default {
  data() {
    return {
      // 弹窗状态
      loginDialog: false,
      getCodeText: '获取验证码',
      phone: null,
      code: null,
      // 是否可以发送验证码
      sendCode: true,
      // 提示信息
      msg: null,
      msgType: 'danger'
    }
  },
  mounted() {
    if (getCookie('csrftoken')) {
      this.apiGetUserInfo()
    } else {
      this.loginDialog = true
    }
  },
  methods: {
    async handleGetCode() {
      if (!this.sendCode) {
        return
      }
      this.msg = checkPhone(this.phone)
      if (this.msg !== true) {
        return
      }
      this.msgInit()
      try {
        let { data: { code, sms, msg } } = await masterService.apiGetCode(this.phone)
        if (code !== 10000000) {
          this.msg = `${msg}`
          return
        }
        this.sendCode = false
        this.code = sms
        this.msg = '验证码发送成功'
        this.msgType = 'success'
        this.utilCountDown(60)
      } catch (err) {
        this.msg = `验证码发送失败${err.message}`
      }
    },
    async handleLogin() {
      this.msgInit()
      if (checkPhone(this.phone) === true && this.code) {
      } else {
        this.msg = '请输入手机号和验证码'
        return
      }
      try {
        let { data: { code, userinfo, msg } } = await masterService.apiUserLogin(this.phone, this.code)
        if (code !== 1000000) {
          throw new Error(`${msg}`)
        }
        console.warn('[api][登录]', userinfo)
        this.$store.dispatch('updateUserInfo', userinfo)
        this.msg = '登录成功'
        this.msgType = 'success'

        setTimeout(() => {
          this.loginDialog = false
          this.$store.dispatch('updateonlineStatue')
          this.$router.replace({ name: 'default', query: { time: new Date().getTime() } })
        }, 500)
      } catch (err) {
        console.warn('handleLogin', err)
        this.msg = `${err.message}`
      }
    },
    utilCountDown(second) {
      this.getCodeText = `${second}S后再次发送`
      second--
      if (second === 0) {
        this.getCodeText = '获取验证码'
        this.sendCode = true
        return
      }
      setTimeout(() => {
        this.utilCountDown(second)
      }, 1000)
    },
    msgInit() {
      this.msg = null
      this.msgType = 'danger'
    },
    async apiGetUserInfo() {
      try {
        let { data: { code, userinfo, msg } } = await masterService.apiGetUserInfo()
        this.$store.dispatch('updateUserInfo', userinfo)
        this.$store.dispatch('updateonlineStatue')
        console.warn('[api][获取用户信息]', code, userinfo, msg)
      } catch (err) {
        console.warn('[api][获取用户信息]', err)
      }
    }
  }
}
</script>
<style lang="scss">
.login-wapper {
  position: relative;
  width: 100%;
  height: 100%;
  .login-dialog {
    width: 400px;
    height: 300px;
    .login-title {
      color: #df402a;
      text-align: center;
    }
    .login-code {
      display: flex;
      flex-direction: row;
      .get-code {
        width: 150px;
      }
    }
    .login-message {
      height: 24px;
      line-height: 24px;
    }
  }
}
</style>