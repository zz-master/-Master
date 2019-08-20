<template>
  <div class="detail-creat-wapper">
    <div class="detail-title">
      <input class="special" type="text" v-model="title" placeholder="请输入你的问题题目" />
    </div>
    <div class="detail-master text">@{{nickName}}</div>
    <div class="detail-text">
      <textarea name id cols="30" rows="10" v-model="content"></textarea>
    </div>
    <div class="button" @click="handleCreatNote">提交</div>
  </div>
</template>
<script>
import masterService from '../../service/base.js'
export default {
  data() {
    return {
      title: '',
      content: ''
    }
  },
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
      if (!this.title || !this.content) {
        return
      }
      let params = {
        title: this.title,
        content: this.content,
        parent_id: -1,
        master_id: this.masterId
      }
      try {
        let { data: { code, note, msg } } = await masterService.apiCreatNote(params)
        console.warn('[api][创建帖子]', code, note, msg)
        if (code !== 10000000) {
          return
        }
        this.$store.dispatch('updateNoteStatus')
        this.$router.replace({ name: 'list', query: { noteId: note.id, time: new Date().getTime() } })
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