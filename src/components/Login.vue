<template>
  <div class="ma-login-wapper" v-show="loginDialog">
    <div class="login-mask"></div>
    <div class="login-dialog">
      <div class="login-title">@Master</div>
      <div class="login-phone">
        <input type="text" placeholder="请输入手机号" v-model="phone" @focus="errMsg = null" />
      </div>
      <div class="login-code">
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <div class="get-code" @click="getCode()">{{getCodeText}}</div>
      </div>
      <div class="err-message">{{errMsg}}</div>
      <div class="login-btn">登录</div>
    </div>
  </div>
</template>
<script>
import { checkPhone } from '../utils/tool.js'
export default {
  data() {
    return {
      loginDialog:false,
      getCodeText: '获取验证码',
      phone: null,
      code: null,
      errMsg: null
    }
  },
  methods: {
    getCode() {
      if (!checkPhone(this.phone)) {
        this.errMsg = '请输入正确的手机号'
        return false
      }
      this.errMsg = null
    }
  }
}
</script>
<style lang="scss">
.ma-login-wapper {
  position: relative;
  width: 100%;
  height: 100%;
  .login-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 0;
  }
  .login-dialog {
    position: absolute;
    width: 400px;
    height: 300px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.48);
    z-index: 1;
    background: #ffffff;
    border-radius: 4px;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 30px;
    box-sizing: border-box;
    .login-title {
      font-size: 16px;
      line-height: 20px;
      color: #df402a;
      font-weight: 600;
      text-align: center;
    }
    .login-phone {
      margin-top: 20px;
    }
    .login-code {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      .get-code {
        width: 150px;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        border-radius: 4px;
        color: #909399;
        font-size: 12px;
        padding: 0 10px;
        border: 1px solid #dcdfe6;
        margin-left: 30px;
      }
    }
    .login-btn {
      margin-top: 20px;
      height: 40px;
      line-height: 40px;
      margin-top: 20px;
      text-align: center;
      cursor: pointer;
      color: #ffffff;
      background: #409eff;
      border-radius: 4px;
    }
    .err-message {
      color: #f56c6c;
      font-size: 12px;
      height: 20px;
    }
  }
}
</style>