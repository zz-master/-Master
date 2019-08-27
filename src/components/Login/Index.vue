<template>
  <div class="login-wapper let-mask" v-show="loginDialog">
    <div class="let-dialog">
      <div class="let-dialog-close" @click="closeDialog">X</div>
      <div class="let-title">@Master</div>
      <div class="let-mt10">
        <input placeholder="请输入手机号" v-model="phone" @focus="msg = null" />
      </div>
      <div class="let-mt10 login-code">
        <input placeholder="请输入验证码" v-model="code" @focus="msg = null" />
        <button
          class="let-button let-button-info let-ml10"
          :class="{'let-button-disable':!sendCode}"
          @click="handleGetCode()"
        >{{getCodeText}}</button>
      </div>
      <div
        class="login-message"
        :class="{'let-msg-danger':msgType==='danger','let-msg-success':msgType==='success'}"
      >{{msg}}</div>
      <button class="let-button" @click="handleLogin">登录</button>
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
  props: {
    loginDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit('openLogin', false)
    },
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
        let { data: { userinfo } } = await masterService.apiUserLogin(this.phone, this.code)
        console.warn('[api][登录]', userinfo)
        this.$store.dispatch('updateUserInfo', userinfo)
        this.msg = '登录成功'
        this.msgType = 'success'

        setTimeout(() => {
          this.$store.dispatch('updateOnlineStatus')
          this.$emit('openLogin', false)
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
    }
  }
}
</script>
<style lang="scss">
.login-wapper {
  .let-dialog {
    .let-dialog-close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    .let-title {
      color: #df402a;
      text-align: center;
    }
    .login-code {
      display: flex;
      flex-direction: row;
      .let-button-info {
        width: 200px;
      }
    }
    .login-message {
      height: 24px;
      line-height: 24px;
    }
  }
}
</style>