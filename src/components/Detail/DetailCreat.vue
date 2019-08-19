<template>
  <div class="detail-creat-wapper">
    <div class="detail-title">
      <input class="special" type="text" placeholder="请输入你的问题题目" />
    </div>
    <div class="detail-master text">@{{nickName}}</div>
    <div class="detail-text">
      <textarea name id cols="30" rows="10"></textarea>
    </div>
    <div class="button" @click="handleCreatNote">提交</div>
  </div>
</template>
<script>
import masterService from '../../service/base.js'
export default {
  computed: {
    masterId() {
      return this.$route.query.masterId
    },
    nickName() {
      return this.$route.query.nick_name
    }
  },
  methods: {
    async handleCreatNote() {
      let params = {
        title: '1111',
        content: '11112',
        parent_id: -1,
        master_id: this.masterId
      }
      try {
        let result = await masterService.apiCreatNote(params)
      } catch (err) {
        console.warn('apiCreatNote', err)
      }
    }
  }
}
</script>
<style lang="scss">
.detail-creat-wapper {
  .special {
    display: block;
    height: 40px;
    line-height: 40px;
    padding: 2px 20px;
    border: none;
    border-radius: 0;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 500;
    &:focus {
      border: none;
      border-radius: 0;
      outline: none;
    }
  }
  .detail-master {
    padding-left: 20px;
    margin-top: 20px;
  }
  .detail-text {
    padding-left: 20px;
    margin-top: 20px;
  }
  .button {
    margin-left: 20px;
    margin-top: 20px;
  }
}
</style>